/**
 * DDMAI AUTOMATED TEST CLI RUNNER
 * Verifies all actions, brand rules, links, assets, and structural integrity.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
const blueprintPath = path.join(rootDir, 'BLUEPRINT_NOTE.md');
const logoPath = path.join(rootDir, 'assets', 'ddmai-logo.jpg');
const founderPath = path.join(rootDir, 'assets', 'founder-pankajbhai.jpg');

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
assert(fs.existsSync(blueprintPath), 'BLUEPRINT_NOTE.md exists at workspace root');
assert(fs.existsSync(logoPath), 'DDMAI official logo exists in assets/');
assert(fs.existsSync(founderPath), 'Founder portrait exists in assets/');

const indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
const blueprintContent = fs.existsSync(blueprintPath) ? fs.readFileSync(blueprintPath, 'utf8') : '';

assert(indexContent.length > 50000, `index.html is complete (>50KB, actual: ${(indexContent.length / 1024).toFixed(1)}KB)`);
assert(blueprintContent.length > 4000, `BLUEPRINT_NOTE.md is complete (>4KB, actual: ${(blueprintContent.length / 1024).toFixed(1)}KB)`);

// 2. STRICT LEGACY KEYWORD REMOVAL (Zero Tolerance)
console.log('\n\x1b[36m[Group 2] Zero-Tolerance Legacy Keyword Check\x1b[0m');
const indexHasTutorkhoji = /tutorkhoji/i.test(indexContent);
const blueprintHasTutorkhoji = /tutorkhoji/i.test(blueprintContent);
assert(!indexHasTutorkhoji, 'Zero occurrences of "tutorkhoji" in index.html');
assert(!blueprintHasTutorkhoji, 'Zero occurrences of "tutorkhoji" in BLUEPRINT_NOTE.md');

const indexHasILH = /\bILH\b/i.test(indexContent);
const blueprintHasILH = /\bILH\b/i.test(blueprintContent);
assert(!indexHasILH, 'Zero occurrences of "ILH" in index.html');
assert(!blueprintHasILH, 'Zero occurrences of "ILH" in BLUEPRINT_NOTE.md');

const indexHasOldRef = /TK-V5H4QH/i.test(indexContent);
const blueprintHasOldRef = /TK-V5H4QH/i.test(blueprintContent);
assert(!indexHasOldRef, 'Zero occurrences of legacy code "TK-V5H4QH" in index.html');
assert(!blueprintHasOldRef, 'Zero occurrences of legacy code "TK-V5H4QH" in BLUEPRINT_NOTE.md');

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
