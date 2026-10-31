/**
 * DDMAI PLAYWRIGHT MASTER BROWSER TEST RUNNER
 * Folder: playwright.cli
 * Runs all browser automation suites sequentially:
 * 1. Main Landing Page Suite (playwright-runner.js)
 * 2. Executive Admin Suite (admin-test.js)
 * 3. Member Portal & Certificate Suite (member-and-cert-test.js)
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('======================================================');
console.log('  DDMAI MASTER PLAYWRIGHT TEST SUITE (playwright.cli)');
console.log('  Maintaining separate, isolated browser test execution');
console.log('======================================================\n');

const tests = [
  { name: '1. Public Landing Page & Lead Form Capture', file: 'playwright-runner.js' },
  { name: '2. Executive Admin Suite & Approval Engine', file: 'admin-test.js' },
  { name: '3. Member Login, Dashboard & Certificate Studio', file: 'member-and-cert-test.js' },
  { name: '4. Android Mobile Emulation (Pixel 7)', file: 'mobile-runner.js' },
  { name: '5. Progressive Web App (PWA) & Install Suite', file: 'pwa-test.js' },
  { name: '6. Partner Registration & Business Partner Suite', file: 'partner-registration-test.js' }
];

let allPassed = true;

for (const t of tests) {
  console.log(`\n\x1b[36m>>> Executing: ${t.name} (${t.file})...\x1b[0m`);
  try {
    const fullPath = path.join(__dirname, t.file);
    execSync(`node "${fullPath}"`, { stdio: 'inherit' });
    console.log(`\x1b[32m✔ SUITE PASSED: ${t.name}\x1b[0m\n`);
  } catch (err) {
    console.error(`\x1b[31m✖ SUITE FAILED: ${t.name}\x1b[0m\n`);
    allPassed = false;
    break;
  }
}

console.log('======================================================');
if (allPassed) {
  console.log('  \x1b[32m✔ ALL PLAYWRIGHT CLI BROWSER SUITES PASSED (100%)\x1b[0m');
  console.log('  All screenshots generated in playwright.cli/screenshots/');
} else {
  console.log('  \x1b[31m✖ PLAYWRIGHT CLI TESTS FAILED - REVIEW LOGS ABOVE\x1b[0m');
}
console.log('======================================================\n');

process.exit(allPassed ? 0 : 1);
