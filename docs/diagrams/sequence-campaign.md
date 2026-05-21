# AdSpot — Campaign Lifecycle Sequence Diagram

> **Audience:** Developers, Product
> **Covers:** Media upload → Admin approval → Campaign creation → Screen targeting → Scheduling → TV delivery → Analytics
> **Edit with:** [Mermaid Live](https://mermaid.live) · VS Code Mermaid Preview

```mermaid
sequenceDiagram
    actor ADV as Advertiser
    actor ADM as Admin
    participant FE as React Frontend
    participant API as NestJS API
    participant DB as MySQL
    participant REDIS as Redis (Bull Queue)
    participant STORE as File Storage (uploads/media)
    participant TV as TV Screen App

    rect rgb(227, 242, 253)
    Note over ADV,TV: STEP 1 — MEDIA UPLOAD
    ADV->>FE: Open Media Library → Upload creative
    FE->>API: POST /api/media/upload (multipart/form-data)
    API->>API: Multer middleware validates file type & size
    API->>STORE: Save file to uploads/media/<uuid>.<ext>
    API->>DB: INSERT Media { filePath, type, status: PENDING, advertiserId }
    DB-->>API: Media record { id, status: PENDING }
    API-->>FE: 201 { mediaId, status: "PENDING_REVIEW", previewUrl }
    FE-->>ADV: "Media uploaded — awaiting admin approval"
    end

    rect rgb(255, 248, 225)
    Note over ADV,TV: STEP 2 — ADMIN MEDIA APPROVAL
    ADM->>FE: Open Media Approval panel
    FE->>API: GET /api/media/pending
    API->>DB: SELECT Media WHERE status=PENDING
    DB-->>API: Pending media list
    API-->>FE: Media items with preview thumbnails
    FE-->>ADM: Show media queue

    ADM->>FE: Review and Approve (or Reject with reason)
    FE->>API: PATCH /api/media/:id { status: "APPROVED" }
    API->>DB: UPDATE Media SET status=APPROVED, reviewedAt=NOW()
    API->>DB: INSERT Notification { userId: advertiserId, message: "Media approved" }
    API-->>FE: 200 OK
    FE-->>ADV: In-app notification "Your media has been approved"
    end

    rect rgb(232, 245, 233)
    Note over ADV,TV: STEP 3 — CAMPAIGN CREATION
    ADV->>FE: Click "Create Campaign"
    FE->>API: GET /api/screens?city=...&venueKind=...
    API->>DB: SELECT Screens WHERE active=true + filters
    DB-->>API: Available screens with rates
    API-->>FE: Screen list (name, location, rate, thumbnail)
    FE-->>ADV: Map / grid of available screens

    ADV->>FE: Select screens, set name, budget, start/end dates, mediaId
    FE->>API: POST /api/campaigns\n{ name, mediaId, screenIds[], startDate, endDate, totalBudget }
    API->>DB: SELECT Media WHERE id=mediaId AND status=APPROVED
    DB-->>API: Approved media

    API->>DB: SELECT ScreenRate for each screenId
    API->>API: Calculate estimatedCost = Σ(rate × slots × screens)

    API->>DB: SELECT User.walletBalance WHERE id=advertiserId

    alt walletBalance < estimatedCost
        API-->>FE: 402 { message: "Insufficient balance", required: X, available: Y }
        FE-->>ADV: "Top up your balance to run this campaign"
    else Balance sufficient
        API->>DB: INSERT Campaign { name, status: SCHEDULED, mediaId, advertiserId, budget }
        API->>DB: INSERT CampaignScreen[] (one row per screenId)
        API->>REDIS: scheduleJob("activateCampaign", { campaignId }, { delay: msUntilStart })
        API-->>FE: 201 { campaignId, status: "SCHEDULED", estimatedCost }
        FE-->>ADV: "Campaign scheduled! Starts on <date>"
    end
    end

    rect rgb(252, 228, 236)
    Note over ADV,TV: STEP 4 — CAMPAIGN ACTIVATION & CHARGING
    REDIS->>API: Bull job fires at campaign startDate
    API->>DB: UPDATE Campaign SET status=ACTIVE, activatedAt=NOW()

    loop Every ad play event (reported by TV App)
        TV->>API: POST /api/tv/screens/:id/analytics/sync { plays[] }
        API->>DB: SELECT ScreenRate.pricePerSlot for screen
        API->>DB: SELECT User.walletBalance for advertiser

        alt Balance depleted
            API->>DB: UPDATE Campaign SET status=PAUSED
            API->>DB: INSERT Notification { userId: advertiserId, message: "Campaign paused: low balance" }
        else Balance OK
            API->>DB: INSERT ChargingTransaction { campaignId, screenId, amount, type: DEBIT }
            API->>DB: UPDATE User SET walletBalance -= amount WHERE id=advertiserId
            API->>DB: INSERT ChargingTransaction { type: CREDIT, publisherId, amount: publisherShare }
            API->>DB: INSERT Analytics { campaignId, screenId, viewCount, timestamp }
        end
    end

    REDIS->>API: Bull job fires at campaign endDate
    API->>DB: UPDATE Campaign SET status=COMPLETED, completedAt=NOW()
    API->>DB: INSERT Notification { userId: advertiserId, message: "Campaign completed" }
    end

    rect rgb(237, 231, 246)
    Note over ADV,TV: STEP 5 — TV DELIVERY
    TV->>API: GET /api/tv/screens/:screenId/campaigns
    API->>DB: SELECT Campaigns\nJOIN CampaignScreens ON campaigns.id=campaignScreens.campaignId\nWHERE screenId=? AND status=ACTIVE\nAND NOW() BETWEEN startDate AND endDate
    DB-->>API: Active campaign list with media
    API-->>TV: [{ campaignId, mediaUrl, duration, order }]

    loop Campaign rotation
        TV->>STORE: GET /uploads/media/<filename> (via API static serve)
        STORE-->>TV: Media file
        TV->>TV: Display ad for configured duration
    end
    end

    rect rgb(255, 243, 224)
    Note over ADV,TV: STEP 6 — ANALYTICS REPORTING
    ADV->>FE: Open Campaign Analytics
    FE->>API: GET /api/analytics/campaigns/:id
    API->>DB: SELECT Analytics WHERE campaignId=?\nGROUP BY screenId, date
    API->>DB: SELECT ChargingTransactions WHERE campaignId=?
    DB-->>API: Views, spend, reach data
    API-->>FE: { totalViews, totalSpend, screenBreakdown[], dailyTrend[] }
    FE-->>ADV: Charts: views over time, spend, screen performance
    end
```
