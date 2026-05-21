# AdSpot — Payments & Billing Sequence Diagram

> **Audience:** Developers, Finance
> **Covers:** Top-up flow → Gateway checkout → Webhook processing → Balance update → Campaign charging → Publisher payout
> **Edit with:** [Mermaid Live](https://mermaid.live) · VS Code Mermaid Preview

```mermaid
sequenceDiagram
    actor ADV as Advertiser
    actor ADM as Admin
    participant FE as React Frontend
    participant API as NestJS PaymentModule
    participant GW as Payment Gateway (Stripe / Razorpay)
    participant DB as MySQL
    participant NOTIF as NotificationsModule
    actor PUB as Publisher

    rect rgb(227, 242, 253)
    Note over ADV,PUB: STEP 1 — TOP-UP: CHOOSE GATEWAY
    ADV->>FE: Open "Add Funds" → Select amount
    FE->>API: GET /api/payments/gateways
    API->>DB: SELECT PaymentGateway WHERE isActive=true
    DB-->>API: [{ id, name, logo, minAmount, maxAmount }]
    API-->>FE: Active gateways list
    FE-->>ADV: Show payment options (Stripe / Razorpay / etc.)
    ADV->>FE: Select gateway, confirm amount
    end

    rect rgb(232, 245, 233)
    Note over ADV,PUB: STEP 2 — CHECKOUT SESSION
    FE->>API: POST /api/payments/create-checkout-session\n{ amount, currency, gatewayId }
    API->>DB: INSERT PaymentTransaction\n{ userId, amount, gatewayId, status: PENDING, reference: uuid }
    DB-->>API: Transaction record
    API->>GW: Create payment session\n(amount, currency, metadata: { reference, userId })
    GW-->>API: { sessionId, checkoutUrl, expiresAt }
    API->>DB: UPDATE PaymentTransaction SET externalSessionId=sessionId
    API-->>FE: 200 { checkoutUrl }
    FE-->>ADV: Redirect to gateway checkout page
    end

    rect rgb(255, 248, 225)
    Note over ADV,PUB: STEP 3 — USER COMPLETES PAYMENT (on Gateway)
    ADV->>GW: Enter card details, authenticate (3DS if required)
    GW-->>ADV: Payment success / failure page
    ADV->>FE: Redirect to /payment/success?session_id=...
    FE->>API: Verify payment status (optional poll)
    Note right of FE: Frontend shows "Processing..." while<br/>waiting for webhook confirmation
    end

    rect rgb(252, 228, 236)
    Note over ADV,PUB: STEP 4 — WEBHOOK PROCESSING (server-to-server)
    GW->>API: POST /api/payments/webhook/:gateway\n{ event: "payment.completed", data: {...} }
    API->>API: Verify webhook signature\n(HMAC-SHA256 with gateway secret)

    alt Signature invalid
        API-->>GW: 400 Bad Request
        Note right of API: Log security alert
    else Signature valid
        API->>DB: SELECT PaymentTransaction WHERE externalSessionId=? AND status=PENDING
        DB-->>API: Pending transaction

        alt Already processed (idempotency)
            API-->>GW: 200 OK (no-op)
        else Not yet processed
            API->>DB: UPDATE PaymentTransaction SET status=COMPLETED, completedAt=NOW()
            API->>DB: UPDATE User SET walletBalance += amount WHERE id=userId
            API->>DB: INSERT Transaction\n{ userId, amount, type: CREDIT, description: "Wallet top-up" }
            API->>NOTIF: Emit notification event
            NOTIF->>DB: INSERT Notification { userId, message: "₹X added to your balance" }
            NOTIF-->>ADV: In-app notification
            NOTIF-->>ADV: Email confirmation
            API-->>GW: 200 OK (acknowledge)
            FE-->>ADV: "Balance updated! ₹X added."
        end
    end
    end

    rect rgb(237, 231, 246)
    Note over ADV,PUB: STEP 5 — CAMPAIGN CHARGING (per-play deduction)
    Note over API,DB: Triggered by TvAppModule when analytics sync arrives
    loop Per ad play event reported by screen
        API->>DB: SELECT ScreenRate WHERE screenId=? AND isActive=true
        DB-->>API: { pricePerSlot, publisherSharePercent }
        API->>DB: SELECT User.walletBalance WHERE id=advertiserId
        DB-->>API: Current balance

        alt Balance < pricePerSlot
            API->>DB: UPDATE Campaign SET status=PAUSED WHERE id=?
            API->>NOTIF: Emit low-balance event
            NOTIF->>DB: INSERT Notification { userId: advertiserId, message: "Campaign paused: insufficient balance" }
            NOTIF-->>ADV: Push + email alert
        else Balance sufficient
            API->>API: publisherShare = pricePerSlot × publisherSharePercent / 100
            API->>API: platformFee = pricePerSlot - publisherShare

            API->>DB: INSERT ChargingTransaction\n{ campaignId, screenId, amount: pricePerSlot,\n  type: DEBIT, userId: advertiserId }
            API->>DB: UPDATE User SET walletBalance -= pricePerSlot WHERE id=advertiserId

            API->>DB: INSERT ChargingTransaction\n{ type: CREDIT, publisherId, amount: publisherShare }
            API->>DB: UPDATE Store SET earnings += publisherShare WHERE publisherId=?
        end
    end
    end

    rect rgb(255, 243, 224)
    Note over ADV,PUB: STEP 6 — PUBLISHER PAYOUT REQUEST
    PUB->>FE: Open Earnings → Request Payout
    FE->>API: GET /api/publisher/earnings (current balance)
    API->>DB: SELECT SUM(amount) FROM ChargingTransactions WHERE publisherId=? AND type=CREDIT
    DB-->>API: Available earnings
    API-->>FE: { availableBalance, pendingPayouts }
    FE-->>PUB: Show earnings breakdown

    PUB->>FE: Request payout (amount, bank details)
    FE->>API: POST /api/publisher/payout-request { amount }
    API->>DB: INSERT PayoutRequest { publisherId, amount, status: PENDING }
    API-->>FE: 201 { message: "Payout request submitted — review within 2 business days" }

    ADM->>FE: Open Admin → Publisher Payouts
    FE->>API: GET /api/publisher/payout-requests?status=PENDING
    API->>DB: SELECT PayoutRequests WHERE status=PENDING
    API-->>FE: Pending payout list
    ADM->>FE: Approve payout
    FE->>API: PATCH /api/publisher/payout-requests/:id { status: APPROVED }
    API->>DB: UPDATE PayoutRequest SET status=APPROVED, processedAt=NOW()
    API->>DB: UPDATE Store SET earnings -= amount WHERE publisherId=?
    API->>NOTIF: Notify publisher
    NOTIF-->>PUB: "Payout of ₹X approved — will arrive in 2-3 days"
    end
```
