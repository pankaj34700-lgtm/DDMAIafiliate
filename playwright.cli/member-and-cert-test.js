const { chromium } = require('./node_modules/playwright');
const path = require('path');
const fs = require('fs');

async function runMemberAndCertTest() {
  console.log('======================================================');
  console.log('  DDMAI MEMBER PORTAL & CERTIFICATE PLAYWRIGHT SUITE');
  console.log('  Testing User Login, Welcome Message, Dashboard & Cert');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const indexUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  const userDashUrl = 'file:///' + path.resolve(__dirname, '..', 'user-dashboard.html').replace(/\\/g, '/');
  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  try {
    // 1. Open index.html
    await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });
    console.log('✔ PASS: index.html loaded');

    // 2. Open User Login Modal
    await page.evaluate(() => openUserLoginModal());
    await page.waitForTimeout(300);
    const loginModalVisible = await page.isVisible('#user-login-modal');
    if (!loginModalVisible) throw new Error('#user-login-modal should be visible');
    console.log('✔ PASS: User Login modal opened successfully');
    await page.screenshot({ path: path.join(screenshotsDir, '08-user-login-modal.png') });

    // 3. Trigger 1-Click Quick Demo Login (Apex Science Academy)
    await page.evaluate(() => quickDemoLogin('apex'));
    await page.waitForTimeout(400);

    // 4. Verify Welcome Message Modal is displayed
    const welcomeVisible = await page.isVisible('#welcome-message-modal');
    if (!welcomeVisible) throw new Error('#welcome-message-modal should be visible after login');
    console.log('✔ PASS: Welcome Message from Veteran PankajBhai displayed');
    await page.screenshot({ path: path.join(screenshotsDir, '09-welcome-message-modal.png') });

    // 5. Click Confirm Welcome -> Opens User Dashboard
    await page.evaluate(() => confirmWelcomeAndOpenDashboard());
    await page.waitForTimeout(400);

    const userDashVisible = await page.isVisible('#user-dashboard-modal');
    if (!userDashVisible) throw new Error('#user-dashboard-modal should be visible');
    console.log('✔ PASS: In-page User Dashboard modal opened with member stats');
    await page.screenshot({ path: path.join(screenshotsDir, '10-user-dashboard-modal.png') });
    await page.evaluate(() => closeUserDashboardModal());
    await page.waitForTimeout(200);

    // 6. Open Certificate System Modal
    await page.evaluate(() => openCertificateModal());
    await page.waitForTimeout(400);

    const certVisible = await page.isVisible('#certificate-modal');
    if (!certVisible) throw new Error('#certificate-modal should be visible');
    console.log('✔ PASS: Official Certificate Verification & Generator modal opened');
    await page.screenshot({ path: path.join(screenshotsDir, '11-certificate-modal.png') });
    await page.evaluate(() => closeCertificateModal());
    await page.waitForTimeout(200);

    // 7. Test Standalone user-dashboard.html
    await page.goto(userDashUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const welcomeBannerVisible = await page.isVisible('#welcome-banner');
    if (!welcomeBannerVisible) throw new Error('#welcome-banner on user-dashboard.html should be visible');
    console.log('✔ PASS: Standalone user-dashboard.html rendered with full member suite');
    await page.screenshot({ path: path.join(screenshotsDir, '12-standalone-user-dashboard.png') });

    console.log('\n======================================================');
    console.log('  ALL MEMBER & CERTIFICATE TESTS PASSED (100%)');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ FAIL:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runMemberAndCertTest();
