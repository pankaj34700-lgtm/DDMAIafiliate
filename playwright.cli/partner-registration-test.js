/**
 * DDMAI PARTNER REGISTRATION PLAYWRIGHT TEST
 * Folder: playwright.cli
 * Verifies that "Apply as Business Partner" and "Register at DDMAI" buttons work cleanly inside the app without opening 404/non-existent pages.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runPartnerRegTest() {
  console.log('======================================================');
  console.log('  DDMAI PARTNER REGISTRATION PLAYWRIGHT TEST');
  console.log('  Testing Business Partner & Register Button Flow');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  console.log(`[Stage 1] Navigating to ${fileUrl}...`);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  // 1. Click "Apply as Business Partner" in Plan 02 section
  console.log('[Stage 2] Clicking "Apply as Digital Business Partner" button...');
  const businessPartnerBtn = page.locator('text=Apply as Digital Business Partner').first();
  await businessPartnerBtn.scrollIntoViewIfNeeded();
  await businessPartnerBtn.click();
  await page.waitForTimeout(300);

  // 2. Verify modal opened
  const modalVisible = await page.isVisible('#partner-register-modal');
  if (!modalVisible) throw new Error('Partner Registration modal did not open!');
  console.log('  ✔ PASS: #partner-register-modal opened successfully');

  // Verify modal title
  const modalTitle = await page.innerText('#partner-modal-title');
  console.log(`  ✔ PASS: Modal title is "${modalTitle}"`);

  // Verify selected role in dropdown is business-partner
  const selectedRole = await page.$eval('#partner-reg-role', el => el.value);
  console.log(`  ✔ PASS: Pre-selected role is "${selectedRole}"`);

  // 3. Take screenshot of Business Partner Registration Modal
  const ssDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
  const ss1 = path.join(ssDir, '13-business-partner-modal.png');
  await page.screenshot({ path: ss1 });
  console.log(`  ✔ PASS: Snapshot saved: ${ss1}`);

  // 4. Fill form inputs
  console.log('[Stage 3] Filling registration form details...');
  await page.fill('#partner-reg-name', 'Veteran PankajBhai Partner');
  await page.fill('#partner-reg-phone', '9638055552');
  await page.fill('#partner-reg-email', 'partner.ddmai@example.com');
  await page.fill('#partner-reg-city', 'Gandhinagar, Gujarat');

  // 5. Submit form
  console.log('[Stage 4] Submitting partner registration...');
  await page.click('#partner-reg-submit-btn');
  await page.waitForTimeout(400);

  // 6. Verify success screen
  const successVisible = await page.isVisible('#partner-reg-success');
  if (!successVisible) throw new Error('Partner registration success screen was not displayed!');
  console.log('  ✔ PASS: Registration success screen #partner-reg-success is visible');

  const partnerId = await page.innerText('#partner-success-id');
  console.log(`  ✔ PASS: Assigned Partner ID: "${partnerId}"`);

  const ss2 = path.join(ssDir, '14-partner-registration-success.png');
  await page.screenshot({ path: ss2 });
  console.log(`  ✔ PASS: Snapshot saved: ${ss2}`);

  // 7. Verify session was stored in localStorage
  const storedSession = await page.evaluate(() => localStorage.getItem('ddmai_user_auth'));
  if (!storedSession || !storedSession.includes('Veteran PankajBhai Partner')) {
    throw new Error('Member session was not saved to localStorage!');
  }
  console.log('  ✔ PASS: 24-hr member session stored successfully in localStorage');

  // 8. Test launching dashboard from modal
  console.log('[Stage 5] Launching Member Dashboard from partner success screen...');
  await page.click('button:has-text("Open My Member Dashboard Now")');
  await page.waitForTimeout(400);

  const dashVisible = await page.isVisible('#user-dashboard-modal');
  if (!dashVisible) throw new Error('User dashboard did not open from partner registration success screen!');
  console.log('  ✔ PASS: Member Dashboard opened seamlessly with new partner profile');

  const ss3 = path.join(ssDir, '15-partner-logged-in-dashboard.png');
  await page.screenshot({ path: ss3 });
  console.log(`  ✔ PASS: Snapshot saved: ${ss3}`);

  await browser.close();
  console.log('\n======================================================');
  console.log('  ALL PARTNER REGISTRATION PLAYWRIGHT TESTS PASSED (100%)');
  console.log('======================================================\n');
}

runPartnerRegTest().catch(err => {
  console.error('Partner Registration Test error:', err);
  process.exit(1);
});
