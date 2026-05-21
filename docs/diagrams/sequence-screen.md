# AdSpot — TV Screen App Sequence Diagram

> **Audience:** Developers, DevOps
> **Covers:** Screen registration → Activation → Rate setup → Heartbeat loop → Campaign fetch → Playback → Analytics sync
> **Edit with:** [Mermaid Live](https://mermaid.live) · VS Code Mermaid Preview

```mermaid
sequenceDiagram
    actor PUB as Publisher
    participant FE as React Frontend
    participant API as NestJS API
    participant DB as MySQL
    participant STORE as File Storage
    participant SCR as Screen Device (TV App)

    rect rgb(232, 245, 233)
    Note over PUB,SCR: STEP 1 — SCREEN REGISTRATION (Publisher side)
    PUB->>FE: Navigate to Publisher → My Screens → Add Screen
    FE-->>PUB: Registration form (name, city, venueKind, size, thumbnail)
    PUB->>FE: Submit form
    FE->>API: POST /api/publisher/screens\n{ name, cityId, venueKindId, width, height, address }
    API->>DB: INSERT Screen { publisherId, status: PENDING_ACTIVATION }
    API->>DB: INSERT screen_codes { screenId, code: random 6-char, used: false }
    API-->>FE: 201 { screenId, activationCode: "ABC123" }
    FE-->>PUB: Show activation code with QR
    Note right of PUB: Publisher enters this code<br/>into the TV App on screen
    end

    rect rgb(227, 242, 253)
    Note over PUB,SCR: STEP 2 — SCREEN ACTIVATION (TV App)
    SCR->>API: POST /api/auth/screen-login { activationCode: "ABC123" }
    API->>DB: SELECT screen_codes WHERE code=? AND used=false
    DB-->>API: Screen record found
    API->>DB: UPDATE screen_codes SET used=true
    API->>DB: UPDATE Screen SET status=ACTIVE, activatedAt=NOW()
    API->>API: Sign screenToken = jwt.sign({ sub: screenId, type: 'screen' })
    API-->>SCR: 200 { screenToken, config: { refreshInterval, defaultSlotDuration } }
    SCR->>SCR: Persist screenToken securely
    Note right of SCR: All future API calls use:<br/>Authorization: Bearer <screenToken>
    end

    rect rgb(255, 248, 225)
    Note over PUB,SCR: STEP 3 — SCREEN RATE SETUP (Publisher)
    PUB->>FE: Open screen settings → Set pricing
    FE->>API: POST /api/charging/rates\n{ screenId, pricePerSlot, slotDurationSeconds, currency }
    API->>DB: INSERT ScreenRate { screenId, pricePerSlot, isActive: true }
    API-->>FE: 201 rate saved
    FE-->>PUB: "Pricing updated — screen visible to advertisers"
    Note right of PUB: Screen now appears in advertiser<br/>screen search with rate shown
    end

    rect rgb(252, 228, 236)
    Note over PUB,SCR: STEP 4 — HEARTBEAT LOOP (continuous)
    loop Every 60 seconds
        SCR->>API: POST /api/tv/screens/:id/heartbeat\n{ status: "online", cpuUsage, memoryUsage, appVersion }
        API->>DB: UPSERT HeartbeatLog { screenId, timestamp: NOW(), status }
        API->>DB: UPDATE Screen SET lastSeenAt=NOW(), deviceInfo=?
        API->>DB: SELECT any pending commands for this screen
        DB-->>API: commands[] (e.g., restart, update config, emergency message)
        API-->>SCR: 200 { commands: [], configUpdate: null }
        SCR->>SCR: Process any returned commands
    end
    Note over SCR: If heartbeat fails 3×, screen marked offline<br/>Admin can see offline screens in dashboard
    end

    rect rgb(237, 231, 246)
    Note over PUB,SCR: STEP 5 — CAMPAIGN FETCH & PLAYBACK
    SCR->>API: GET /api/tv/screens/:id/campaigns
    Note right of SCR: Called on startup and after<br/>each heartbeat if config says refresh
    API->>DB: SELECT c.*, m.filePath, m.type, cs.order\nFROM Campaigns c\nJOIN CampaignScreens cs ON c.id=cs.campaignId\nJOIN Media m ON c.mediaId=m.id\nWHERE cs.screenId=?\nAND c.status='ACTIVE'\nAND NOW() BETWEEN c.startDate AND c.endDate\nORDER BY cs.order
    DB-->>API: Campaign list with media refs
    API-->>SCR: [{ campaignId, mediaUrl, type, durationSeconds, order }]

    loop Campaign rotation (continuous loop)
        SCR->>SCR: Check if media file cached locally
        alt Not cached or stale
            SCR->>API: GET /uploads/media/<filename>
            API->>STORE: Read file from disk
            STORE-->>API: Binary file data
            API-->>SCR: Media file (image/video)
            SCR->>SCR: Cache to local storage
        end
        SCR->>SCR: Display ad on screen for durationSeconds
        SCR->>SCR: Append to local play log { campaignId, screenId, timestamp, duration }
    end
    end

    rect rgb(255, 243, 224)
    Note over PUB,SCR: STEP 6 — ANALYTICS SYNC
    loop Every 5 minutes (or on heartbeat)
        SCR->>API: POST /api/tv/screens/:id/analytics/sync\n{ plays: [{ campaignId, timestamp, duration, completed }] }
        API->>DB: INSERT Analytics[] (bulk insert)
        API->>DB: UPDATE Campaign SET totalViews += count WHERE id IN (...)
        API-->>SCR: 200 { synced: N }
        SCR->>SCR: Clear local play log
    end
    end

    rect rgb(232, 234, 246)
    Note over PUB,SCR: STEP 7 — DEVICE INFO UPDATE
    SCR->>API: PATCH /api/tv/screens/:id/device-info\n{ os, osVersion, appVersion, resolution, timezone }
    API->>DB: UPDATE Screen SET deviceInfo=JSON_SET(deviceInfo, ...)
    API-->>SCR: 200 OK
    Note right of SCR: Sent once on boot and after<br/>any app update
    end
```
