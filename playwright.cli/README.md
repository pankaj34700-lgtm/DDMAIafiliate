# DDMAI Playwright Browser Automation Suite (`playwright.cli`)

**Target Platform:** Digital Direct Marketing – AI & Tech (DDMAI)  
**Founder:** Veteran PankajBhai Umesh Gupta (Gandhinagar, Gujarat)  
**Directory Isolation:** Fully self-contained separate folder (`playwright.cli/`)

---

## 1. Overview & Test Coverage (35+ End-to-End Tests)

This folder contains the complete, dedicated browser automation test suite powered by Chromium/Playwright. It validates real user journeys, visual rendering, form captures, and captures high-resolution screenshots.

### Test Suites Included:
1. **`playwright-runner.js` (21 Tests):**
   - Public Landing Page rendering & navigation (`#home`, `#founder`, `#services`, `#plans`, `#masterclass`, `#how-it-works`, `#help`)
   - Interactive hero tab switching (`#tab-btn-coaching`)
   - Welcome letter modal & printable certificate view
   - Live Webinar registration form submission & success screen
   - WhatsApp Web redirect link generation with pre-filled message
   - Rendered DOM text audit for zero legacy keywords

2. **`admin-test.js` (8 Tests):**
   - Executive Admin lock screen & authentication gate
   - Passcode verification (`ddmai2026`)
   - 5-Minute Coaching Portal Approval Engine
   - Webinar Leads CRM 2.0 with temperature scoring
   - Visual Analytics & Conversion Funnel
   - WhatsApp Broadcast Studio with Smartphone mockup
   - 11-Day Deep Nurture Email architecture timeline

3. **`member-and-cert-test.js` (6 Tests):**
   - Member Login modal & quick 1-click demo login
   - Personalized Founder Welcome Message from Veteran PankajBhai Umesh Gupta
   - Member Dashboard with portal status, unlock credits, and marketing tools
   - Official Certificate Verification & Generator modal with print triggers
   - Standalone `user-dashboard.html` suite verification

4. **`mobile-runner.js`:**
   - Mobile responsive layout on Pixel 7 device viewport.

---

## 2. Screenshots Gallery (`playwright.cli/screenshots/`)

All tests automatically output high-resolution screenshots to:
- `01-desktop-home.png`
- `02-welcome-certificate.png`
- `03-webinar-confirmation.png`
- `04-admin-lockscreen.png`
- `05-admin-dashboard.png`
- `06-admin-broadcast.png`
- `07-admin-analytics.png`
- `08-user-login-modal.png`
- `09-welcome-message-modal.png`
- `10-user-dashboard-modal.png`
- `11-certificate-modal.png`
- `12-standalone-user-dashboard.png`

---

## 3. How to Run

### Option A: 1-Click Batch Runner (Runs All 3 Suites)
Double-click:
```
run-playwright.bat
```

### Option B: Node CLI
From the project root:
```bash
node playwright.cli/run-all-playwright.js
```
Or run any individual suite:
```bash
node playwright.cli/playwright-runner.js
node playwright.cli/admin-test.js
node playwright.cli/member-and-cert-test.js
```
