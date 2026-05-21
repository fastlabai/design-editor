# AdSpot Platform — User Journey Flow

> **Audience:** Business / product stakeholders
> **Edit with:** Any Markdown editor · [Mermaid Live](https://mermaid.live) · VS Code (Mermaid Preview extension)

```mermaid
flowchart TD
    V(["🌐 Visitor"])
    LP["Landing Page"]
    REG["Register Account"]
    LOG["Login"]
    EV["Email Verification"]
    ROLE{"Role?"}

    V --> LP
    LP --> REG
    LP --> LOG
    REG --> EV
    EV --> ROLE
    LOG --> ROLE

    ROLE -->|ADMIN| ADM_DASH
    ROLE -->|ADVERTISER| ADV_DASH
    ROLE -->|PUBLISHER| PUB_DASH

    subgraph ADMIN ["🛡️ Admin Portal"]
        ADM_DASH["Admin Dashboard"]
        ADM_DASH --> UM["User Management"]
        ADM_DASH --> SM["Screen Management"]
        ADM_DASH --> CM["Campaign Oversight"]
        ADM_DASH --> MA["Media Approval"]
        ADM_DASH --> PS["Payment Settings"]
        ADM_DASH --> PA["Platform Analytics"]
        ADM_DASH --> DSP["DSP / Programmatic Ads"]
        ADM_DASH --> LC["Language & Location Config"]
        ADM_DASH --> EB["Early Bird Settings"]
        ADM_DASH --> BR["Branding"]
    end

    subgraph ADVERTISER ["📢 Advertiser Portal"]
        ADV_DASH["Advertiser Dashboard"]
        ADV_DASH --> BAL["Balance & Top-up"]
        BAL --> CHKOUT["Payment Checkout"]
        ADV_DASH --> MC["My Campaigns"]
        MC --> CC["Create Campaign"]
        CC --> MU["Upload Media / Canva Editor"]
        CC --> SS["Select Screens"]
        CC --> BS["Set Budget & Schedule"]
        ADV_DASH --> ADVANA["Campaign Analytics"]
        ADV_DASH --> TH["Transaction History"]
    end

    subgraph PUBLISHER ["📺 Publisher Portal"]
        PUB_DASH["Publisher Dashboard"]
        PUB_DASH --> RS["Register Screens"]
        PUB_DASH --> SR["Set Screen Rates"]
        PUB_DASH --> EARN["Earnings & Payouts"]
        PUB_DASH --> PUBANA["Screen Analytics"]
        PUB_DASH --> USB["USB Export for Offline Screens"]
    end

    subgraph SCREEN ["🖥️ TV Screen App"]
        HB["Heartbeat Check-in\n(every 60s)"]
        HB --> FETCH["Fetch Active Campaigns"]
        FETCH --> PLAY["Play Ad Creatives"]
        PLAY --> SYNC["Sync View Analytics"]
        SYNC --> HB
    end

    RS -.->|"Screen goes live\n(activation code)"| HB
    CC -.->|"Campaign approved\n& scheduled"| FETCH

    style ADMIN fill:#fff3e0,stroke:#ef6c00
    style ADVERTISER fill:#e3f2fd,stroke:#1565c0
    style PUBLISHER fill:#e8f5e9,stroke:#2e7d32
    style SCREEN fill:#fce4ec,stroke:#880e4f
```
