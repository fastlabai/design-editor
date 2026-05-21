# AdSpot — Authentication Sequence Diagram

> **Audience:** Developers
> **Covers:** Register → Email Verify → Login → JWT issuance → Token refresh → Role-based routing
> **Edit with:** [Mermaid Live](https://mermaid.live) · VS Code Mermaid Preview

```mermaid
sequenceDiagram
    actor U as User (Browser)
    participant FE as React Frontend
    participant API as NestJS AuthModule
    participant DB as MySQL (User table)
    participant MAIL as SMTP Service

    rect rgb(232, 245, 233)
    Note over U,MAIL: REGISTRATION
    U->>FE: Fill register form (name, email, password, role)
    FE->>API: POST /api/auth/register
    API->>DB: SELECT User WHERE email = ?
    DB-->>API: null (not found)
    API->>API: bcrypt.hash(password, 10)
    API->>DB: INSERT User { email, passwordHash, role, emailVerified: false }
    DB-->>API: User record created
    API->>API: Generate email verification token (UUID)
    API->>DB: Store verification token against user
    API->>MAIL: Send verification email (link with token)
    MAIL-->>U: Email delivered
    API-->>FE: 201 { message: "Check your inbox to verify your email" }
    FE-->>U: Show "Verify your email" notice
    end

    rect rgb(227, 242, 253)
    Note over U,MAIL: EMAIL VERIFICATION
    U->>FE: Click verification link in email
    FE->>API: GET /api/auth/verify-email?token=<token>
    API->>DB: SELECT User WHERE verificationToken = ?
    DB-->>API: User record
    API->>DB: UPDATE User SET emailVerified=true, verificationToken=null
    API-->>FE: 200 { message: "Email verified successfully" }
    FE-->>U: Redirect to /login with success banner
    end

    rect rgb(255, 248, 225)
    Note over U,MAIL: LOGIN
    U->>FE: Enter email + password
    FE->>API: POST /api/auth/login { email, password }
    API->>DB: SELECT User WHERE email = ?
    DB-->>API: User record (with passwordHash)

    alt Email not verified
        API-->>FE: 403 { message: "Please verify your email first" }
        FE-->>U: Show resend-verification prompt
    else Invalid credentials
        API->>API: bcrypt.compare(password, hash) → false
        API-->>FE: 401 { message: "Invalid email or password" }
        FE-->>U: Show error
    else Valid credentials
        API->>API: bcrypt.compare(password, hash) → true
        API->>API: jwt.sign({ sub: userId, role }, ACCESS_SECRET, { expiresIn: '24h' })
        API->>API: jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: '7d' })
        API->>DB: Store refreshToken hash
        API-->>FE: 200 { accessToken, refreshToken, user: { id, email, role, name } }
        FE->>FE: Store tokens in memory / localStorage
        FE->>FE: Dispatch Redux auth.setUser(user)
        Note right of FE: Role-based redirect:<br/>ADMIN → /admin/dashboard<br/>ADVERTISER → /advertiser/dashboard<br/>PUBLISHER → /publisher/dashboard
        FE-->>U: Redirect by role
    end
    end

    rect rgb(252, 228, 236)
    Note over U,MAIL: AUTHENTICATED REQUESTS
    U->>FE: Navigate to protected route
    FE->>FE: React Router checks Redux auth state
    FE->>API: GET /api/[resource] { Authorization: Bearer <accessToken> }
    API->>API: JwtAuthGuard.canActivate() — validate JWT signature + expiry
    API->>API: RolesGuard.canActivate() — check user.role against @Roles() decorator

    alt Token expired (401)
        API-->>FE: 401 Unauthorized
        FE->>API: POST /api/auth/refresh { refreshToken }
        API->>DB: Validate stored refreshToken hash
        API->>API: Issue new accessToken (24h)
        API-->>FE: 200 { accessToken }
        FE->>API: Retry original request with new token
        API-->>FE: 200 { data }
    else Insufficient role (403)
        API-->>FE: 403 Forbidden
        FE-->>U: Redirect to /unauthorized
    else Token valid
        API->>DB: Execute business logic
        DB-->>API: Data
        API-->>FE: 200 ResponseHelper.success(data, message)
        FE->>FE: Update Redux state / render UI
        FE-->>U: Show page
    end
    end

    rect rgb(237, 231, 246)
    Note over U,MAIL: SCREEN LOGIN (TV App)
    participant SCREEN as TV Screen App
    SCREEN->>API: POST /api/auth/screen-login { activationCode }
    API->>DB: SELECT screen_codes WHERE code = ? AND used = false
    DB-->>API: Screen record
    API->>DB: UPDATE screen_codes SET used=true
    API->>DB: UPDATE Screen SET status=ACTIVE
    API->>API: jwt.sign({ sub: screenId, type: 'screen' }, SCREEN_SECRET)
    API-->>SCREEN: 200 { screenToken, screenConfig }
    Note right of SCREEN: Screen uses screenToken<br/>for all subsequent API calls
    end
```
