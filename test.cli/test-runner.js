/**
 * DDMAI AUTOMATED TEST CLI RUNNER
 * Folder: test.cli
 * Verifies all actions, brand rules, links, assets, structural integrity, and separate folder maintenance.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
const adminPath = path.join(rootDir, 'admin.html');
const userDashPath = path.join(rootDir, 'user-dashboard.html');
const signupIndexPath = path.join(rootDir, 'signup', 'index.html');
const signupHtmlPath = path.join(rootDir, 'signup.html');
const publicSignupIndexPath = path.join(rootDir, 'public', 'signup', 'index.html');
const blueprintPath = path.join(rootDir, 'BLUEPRINT_NOTE.md');
const logoPath = path.join(rootDir, 'assets', 'ddmai-logo.jpg');
const founderPath = path.join(rootDir, 'assets', 'founder-pankajbhai.jpg');

const testCliDir = path.join(rootDir, 'test.cli');
const playwrightCliDir = path.join(rootDir, 'playwright.cli');
const obsoletePlaywriteDir = path.join(rootDir, 'playwrite.cli');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} ${details ? `(${details})` : ''}`);
  }
}

console.log('\n======================================================');
console.log('  DDMAI CLI AUTOMATION TEST SUITE (test.cli)');
console.log('  Target: Digital Direct Marketing – AI & Tech');
console.log('======================================================\n');

// 1. FILE & ASSET EXISTENCE CHECKS
console.log('\x1b[36m[Group 1] File & Asset Integrity Checks\x1b[0m');
assert(fs.existsSync(indexPath), 'index.html exists at workspace root');
assert(fs.existsSync(adminPath), 'admin.html exists at workspace root');
assert(fs.existsSync(userDashPath), 'user-dashboard.html exists at workspace root');
assert(fs.existsSync(signupIndexPath), 'signup/index.html exists as dedicated signup page');
assert(fs.existsSync(signupHtmlPath), 'signup.html exists at workspace root');
assert(fs.existsSync(publicSignupIndexPath), 'public/signup/index.html is synchronized');
assert(fs.existsSync(blueprintPath), 'BLUEPRINT_NOTE.md exists at workspace root');
assert(fs.existsSync(logoPath), 'DDMAI official logo exists in assets/');
assert(fs.existsSync(founderPath), 'Founder portrait exists in assets/');

const indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
const adminContent = fs.existsSync(adminPath) ? fs.readFileSync(adminPath, 'utf8') : '';
const userDashContent = fs.existsSync(userDashPath) ? fs.readFileSync(userDashPath, 'utf8') : '';
const signupContent = fs.existsSync(signupIndexPath) ? fs.readFileSync(signupIndexPath, 'utf8') : '';
const blueprintContent = fs.existsSync(blueprintPath) ? fs.readFileSync(blueprintPath, 'utf8') : '';

assert(indexContent.length > 50000, `index.html is complete (>50KB, actual: ${(indexContent.length / 1024).toFixed(1)}KB)`);
assert(adminContent.length > 30000, `admin.html is complete (>30KB, actual: ${(adminContent.length / 1024).toFixed(1)}KB)`);
assert(userDashContent.length > 20000, `user-dashboard.html is complete (>20KB, actual: ${(userDashContent.length / 1024).toFixed(1)}KB)`);
assert(signupContent.length > 10000, `signup/index.html is complete (>10KB, actual: ${(signupContent.length / 1024).toFixed(1)}KB)`);
assert(blueprintContent.length > 4000, `BLUEPRINT_NOTE.md is complete (>4KB, actual: ${(blueprintContent.length / 1024).toFixed(1)}KB)`);

// 2. STRICT LEGACY KEYWORD REMOVAL (Zero Tolerance)
console.log('\n\x1b[36m[Group 2] Zero-Tolerance Legacy Keyword Check\x1b[0m');
assert(!/tutorkhoji/i.test(indexContent), 'Zero occurrences of "tutorkhoji" in index.html');
assert(!/tutorkhoji/i.test(adminContent), 'Zero occurrences of "tutorkhoji" in admin.html');
assert(!/tutorkhoji/i.test(userDashContent), 'Zero occurrences of "tutorkhoji" in user-dashboard.html');
assert(!/tutorkhoji/i.test(signupContent), 'Zero occurrences of "tutorkhoji" in signup/index.html');
assert(!/tutorkhoji/i.test(blueprintContent), 'Zero occurrences of "tutorkhoji" in BLUEPRINT_NOTE.md');

assert(!/\bILH\b/i.test(indexContent), 'Zero occurrences of "ILH" in index.html');
assert(!/\bILH\b/i.test(adminContent), 'Zero occurrences of "ILH" in admin.html');
assert(!/\bILH\b/i.test(userDashContent), 'Zero occurrences of "ILH" in user-dashboard.html');
assert(!/\bILH\b/i.test(signupContent), 'Zero occurrences of "ILH" in signup/index.html');
assert(!/\bILH\b/i.test(blueprintContent), 'Zero occurrences of "ILH" in BLUEPRINT_NOTE.md');

assert(!/TK-V5H4QH/i.test(indexContent), 'Zero occurrences of legacy code "TK-V5H4QH" in index.html');
assert(!/TK-V5H4QH/i.test(signupContent), 'Zero occurrences of legacy code "TK-V5H4QH" in signup/index.html');
assert(!/TK-V5H4QH/i.test(blueprintContent), 'Zero occurrences of legacy code "TK-V5H4QH" in BLUEPRINT_NOTE.md');

// 3. BRAND IDENTITY & FOUNDER VERIFICATION
console.log('\n\x1b[36m[Group 3] Brand Identity & Leadership Verification\x1b[0m');
assert(indexContent.includes('DDMAI'), 'Brand code DDMAI is prominently embedded');
assert(indexContent.includes('Veteran PankajBhai Umesh Gupta'), 'Founder Veteran PankajBhai Umesh Gupta is credited');
assert(indexContent.includes('Gandhinagar'), 'Headquarters Gandhinagar, Gujarat is specified');
assert(indexContent.includes('DDMAI-V5H4QH'), 'Official referral code DDMAI-V5H4QH is configured');
assert(indexContent.includes('+91 9638055552'), 'Primary WhatsApp phone number (+91 9638055552) is linked');
assert(indexContent.includes('ddmai651@gmail.com'), 'Official email (ddmai651@gmail.com) is linked');

// 4. ARCHITECTURE & SECTION COMPLETENESS
console.log('\n\x1b[36m[Group 4] Web Architecture & Single-Page Sections\x1b[0m');
const requiredSections = ['id="home"', 'id="founder"', 'id="services"', 'id="plans"', 'id="masterclass"', 'id="how-it-works"', 'id="help"'];
requiredSections.forEach(sec => {
  assert(indexContent.includes(sec), `Section ${sec} is implemented on the page`);
});

assert(indexContent.includes('id="webinar-modal"'), 'AI Income Freedom Masterclass modal exists');
assert(indexContent.includes('id="welcome-letter-modal"'), 'Official printable Welcome Letter modal exists');
assert(indexContent.includes('id="print-certificate"'), 'Certificate print container exists with ?print=1 styling');
assert(indexContent.includes('window.print()'), '1-Click PDF print functionality is hooked');

// 5. PACKAGES & PRICING VERIFICATION
console.log('\n\x1b[36m[Group 5] Packages, Pricing & Marketing Systems\x1b[0m');
assert(indexContent.includes('1,999'), '₹1,999 Coaching Portal package is configured');
assert(indexContent.includes('Plan 01') && indexContent.includes('300'), 'Plan 01 (Digital Affiliate ₹300) is configured');
assert(indexContent.includes('Plan 02') && indexContent.includes('60%'), 'Plan 02 (Business Partner 60% share) is configured');
assert(indexContent.includes('11-Day'), '11-Day Deep Nurture email system is configured');
assert(indexContent.includes('web.whatsapp.com'), 'WhatsApp Web direct connect URLs are active');

// 6. SEPARATE FOLDER MAINTENANCE VERIFICATION
console.log('\n\x1b[36m[Group 6] Separate Folder Architecture Maintenance (test.cli & playwright.cli)\x1b[0m');
assert(fs.existsSync(testCliDir), 'Folder "test.cli" exists as a separate dedicated directory');
assert(fs.existsSync(path.join(testCliDir, 'test-runner.js')), 'test.cli contains self-contained "test-runner.js"');
assert(fs.existsSync(path.join(testCliDir, 'run-test.bat')), 'test.cli contains 1-click launcher "run-test.bat"');

assert(fs.existsSync(playwrightCliDir), 'Folder "playwright.cli" exists as a separate dedicated directory');
assert(fs.existsSync(path.join(playwrightCliDir, 'playwright-runner.js')), 'playwright.cli contains "playwright-runner.js"');
assert(fs.existsSync(path.join(playwrightCliDir, 'admin-test.js')), 'playwright.cli contains "admin-test.js"');
assert(fs.existsSync(path.join(playwrightCliDir, 'member-and-cert-test.js')), 'playwright.cli contains "member-and-cert-test.js"');
assert(fs.existsSync(path.join(playwrightCliDir, 'mobile-runner.js')), 'playwright.cli contains "mobile-runner.js" (Pixel 7 Android audit)');
assert(fs.existsSync(path.join(playwrightCliDir, 'pwa-test.js')), 'playwright.cli contains "pwa-test.js" (PWA automation suite)');
assert(fs.existsSync(path.join(playwrightCliDir, 'partner-registration-test.js')), 'playwright.cli contains "partner-registration-test.js" (Partner registration suite)');
assert(fs.existsSync(path.join(playwrightCliDir, 'signup-page-test.js')), 'playwright.cli contains "signup-page-test.js" (Dedicated signup page suite)');
assert(fs.existsSync(path.join(playwrightCliDir, 'run-all-playwright.js')), 'playwright.cli contains "run-all-playwright.js" master orchestrator');
assert(fs.existsSync(path.join(playwrightCliDir, 'run-playwright.bat')), 'playwright.cli contains 1-click launcher "run-playwright.bat"');

assert(!fs.existsSync(obsoletePlaywriteDir), 'Legacy duplicate "playwrite.cli" is fully cleaned/removed');

// 7. PROGRESSIVE WEB APP (PWA) VERIFICATION
console.log('\n\x1b[36m[Group 7] Progressive Web App (PWA) System Verification\x1b[0m');
const manifestPath = path.join(rootDir, 'manifest.json');
const swPath = path.join(rootDir, 'sw.js');
const icon192 = path.join(rootDir, 'assets', 'icon-192.png');
const icon512 = path.join(rootDir, 'assets', 'icon-512.png');
const pubManifest = path.join(rootDir, 'public', 'manifest.json');
const pubSw = path.join(rootDir, 'public', 'sw.js');

assert(fs.existsSync(manifestPath), 'manifest.json exists at root');
assert(fs.existsSync(pubManifest), 'public/manifest.json is synchronized');
assert(fs.existsSync(swPath), 'sw.js exists at root');
assert(fs.existsSync(pubSw), 'public/sw.js is synchronized');
assert(fs.existsSync(icon192), 'assets/icon-192.png exists');
assert(fs.existsSync(icon512), 'assets/icon-512.png exists');

let manifestJson = null;
try {
  manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {}

assert(manifestJson !== null, 'manifest.json is valid parseable JSON');
assert(manifestJson && manifestJson.display === 'standalone', 'PWA display mode is "standalone"');
assert(manifestJson && manifestJson.short_name === 'DDMAI', 'PWA short_name is "DDMAI"');
assert(manifestJson && Array.isArray(manifestJson.icons) && manifestJson.icons.length >= 2, 'PWA icons array configured with 192px and 512px assets');

const swContent = fs.existsSync(swPath) ? fs.readFileSync(swPath, 'utf8') : '';
assert(swContent.includes('addEventListener(\'fetch\'') || swContent.includes('addEventListener("fetch"'), 'Service worker implements fetch handler');
assert(swContent.includes('caches.open'), 'Service worker implements cache storage');

assert(indexContent.includes('rel="manifest"') && indexContent.includes('/manifest.json'), 'index.html links to manifest.json');
assert(indexContent.includes('navigator.serviceWorker.register'), 'index.html registers service worker');
assert(indexContent.includes('id="header-pwa-install-btn"'), 'index.html includes 1-click header PWA install button');
assert(indexContent.includes('id="drawer-pwa-install-btn"'), 'index.html includes 1-click drawer PWA install button');
assert(indexContent.includes('triggerPwaInstall'), 'index.html implements triggerPwaInstall() function');

assert(userDashContent.includes('rel="manifest"'), 'user-dashboard.html includes PWA manifest link');
assert(userDashContent.includes('navigator.serviceWorker.register'), 'user-dashboard.html registers service worker');
assert(adminContent.includes('rel="manifest"'), 'admin.html includes PWA manifest link');
assert(adminContent.includes('navigator.serviceWorker.register'), 'admin.html registers service worker');

// 8. PARTNER REGISTRATION & BUSINESS PARTNER FLOW VERIFICATION
console.log('\n\x1b[36m[Group 8] Partner Registration & Business Partner Verification\x1b[0m');
assert(!indexContent.includes('ddmai.com/signup'), 'Zero broken external ddmai.com/signup links in index.html');
assert(!userDashContent.includes('ddmai.com/signup'), 'Zero broken external ddmai.com/signup links in user-dashboard.html');
assert(indexContent.includes('id="partner-register-modal"'), 'index.html contains id="partner-register-modal"');
assert(indexContent.includes('openPartnerRegisterModal'), 'index.html implements openPartnerRegisterModal() function');
assert(indexContent.includes('handlePartnerRegisterSubmit'), 'index.html implements handlePartnerRegisterSubmit() function');
assert(indexContent.includes('openPartnerRegisterModal(\'business-partner\')') || indexContent.includes('openPartnerRegisterModal("business-partner")'), 'Business Partner button triggers openPartnerRegisterModal');
assert(indexContent.includes('openPartnerRegisterModal(\'affiliate\')') || indexContent.includes('openPartnerRegisterModal("affiliate")'), 'Affiliate button triggers openPartnerRegisterModal');
assert(indexContent.includes('id="partner-reg-success"'), 'Partner registration modal contains success view');

// Verify dedicated signup/index.html page
assert(signupContent.includes('DDMAI-V5H4QH'), 'signup/index.html configures referral code DDMAI-V5H4QH');
assert(signupContent.includes('Veteran PankajBhai Umesh Gupta'), 'signup/index.html credits Founder Veteran PankajBhai Umesh Gupta');
assert(signupContent.includes('Digital Business Partner'), 'signup/index.html includes Plan 02 Digital Business Partner');
assert(signupContent.includes('Digital Affiliate'), 'signup/index.html includes Plan 01 Digital Affiliate');
assert(signupContent.includes('+91 9638055552'), 'signup/index.html links to WhatsApp +91 9638055552');
assert(signupContent.includes('id="signup-form"'), 'signup/index.html contains registration form');
assert(signupContent.includes('id="signup-success"'), 'signup/index.html contains success screen');

// Verify firebase.json rewrites for /signup
const firebaseJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'firebase.json'), 'utf8'));
assert(firebaseJson.hosting.rewrites.some(r => r.source === '/signup' && r.destination === '/signup/index.html'), 'firebase.json rewrites /signup to /signup/index.html');
assert(firebaseJson.hosting.rewrites.some(r => r.source === '/signup/**' && r.destination === '/signup/index.html'), 'firebase.json rewrites /signup/** to /signup/index.html');

// 9. GOOGLE AUTHENTICATION SYSTEM VERIFICATION
console.log('\n\x1b[36m[Group 9] Google Authentication System Verification\x1b[0m');
const rootSignupHtml = fs.readFileSync(path.join(rootDir, 'signup.html'), 'utf8');
const pubSignupIndexHtml = fs.readFileSync(path.join(rootDir, 'public', 'signup', 'index.html'), 'utf8');
const pubSignupHtml = fs.readFileSync(path.join(rootDir, 'public', 'signup.html'), 'utf8');

assert(signupContent.includes('id="google-signup-btn"'), 'signup/index.html includes id="google-signup-btn" primary CTA');
assert(signupContent.includes('signupWithGoogle'), 'signup/index.html implements signupWithGoogle() function');
assert(signupContent.includes('handleGoogleSignupSuccess'), 'signup/index.html implements handleGoogleSignupSuccess() function');
assert(signupContent.includes('id="google-signup-modal"'), 'signup/index.html includes fallback modal id="google-signup-modal"');
assert(signupContent.includes('handleGoogleModalSubmit'), 'signup/index.html implements handleGoogleModalSubmit() function');
assert(signupContent.includes('ddmaiaffiliate.firebaseapp.com'), 'signup/index.html configures official Firebase Auth domain');
assert(signupContent.includes('id="existing-session-banner"'), 'signup/index.html includes id="existing-session-banner" for active sessions');
assert(indexContent.includes('loginWithGoogle'), 'index.html implements loginWithGoogle() authentication flow');
assert(indexContent.includes('id="google-details-modal"'), 'index.html contains id="google-details-modal"');
assert(userDashContent.includes('loginWithGoogle'), 'user-dashboard.html implements loginWithGoogle() authentication flow');
assert(userDashContent.includes('id="dash-google-badge"'), 'user-dashboard.html contains Google Verified badge');
assert(rootSignupHtml.includes('id="google-signup-btn"'), 'signup.html is synchronized with Google authentication CTA');
assert(pubSignupIndexHtml.includes('id="google-signup-btn"'), 'public/signup/index.html is synchronized with Google authentication CTA');
assert(pubSignupHtml.includes('id="google-signup-btn"'), 'public/signup.html is synchronized with Google authentication CTA');

// SUMMARY REPORT
console.log('\n======================================================');
console.log(`  SUMMARY: Total Tests: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
if (failedTests === 0) {
  console.log('  \x1b[32m✔ ALL ACTIONS AND VERIFICATIONS COMPLETED SUCCESSFULLY!\x1b[0m');
} else {
  console.log('  \x1b[31m✖ SOME CHECKS FAILED - REVIEW LOGS ABOVE\x1b[0m');
}
console.log('======================================================\n');

process.exit(failedTests === 0 ? 0 : 1);
