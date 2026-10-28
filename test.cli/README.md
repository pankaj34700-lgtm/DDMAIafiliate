# DDMAI CLI Automated Test Suite (`test.cli`)

**Target Ecosystem:** Digital Direct Marketing – AI & Tech (DDMAI)  
**Founder:** Veteran PankajBhai Umesh Gupta (Gandhinagar, Gujarat)  
**Directory Isolation:** Fully self-contained separate folder (`test.cli/`)

---

## 1. Overview & Test Coverage (51 Tests)

This folder contains the complete, independent CLI verification suite for the DDMAI platform. It tests:
1. **File & Asset Integrity:** Ensures `index.html`, `admin.html`, `user-dashboard.html`, `BLUEPRINT_NOTE.md`, and official branding assets exist and meet minimum size criteria.
2. **Zero-Tolerance Legacy Keyword Check:** Verifies 0 occurrences of deprecated names (`tutorkhoji`, `ILH`, `TK-V5H4QH`).
3. **Brand Identity & Leadership Verification:** Verifies DDMAI, Veteran PankajBhai Umesh Gupta, Gandhinagar, referral code `DDMAI-V5H4QH`, phone `+91 9638055552`, and official email `ddmai651@gmail.com`.
4. **Web Architecture & Single-Page Sections:** Verifies all 7 sections (`#home`, `#founder`, `#services`, `#plans`, `#masterclass`, `#how-it-works`, `#help`) and core modals.
5. **Packages, Pricing & Marketing Systems:** Verifies ₹1,999 coaching portal, Plan 01 ₹300, Plan 02 60%, and 11-Day email framework.
6. **Separate Folder Maintenance:** Verifies `test.cli/` and `playwright.cli/` are maintained strictly as separate folders, with all launchers present and legacy folders deleted.

---

## 2. How to Run

### Option A: 1-Click Batch Runner
Double-click:
```
run-test.bat
```

### Option B: Node CLI
From the project root:
```bash
node test.cli/test-runner.js
```
