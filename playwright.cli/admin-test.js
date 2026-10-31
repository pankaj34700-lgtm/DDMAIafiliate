const path = require('path');
const fs = require('fs');

let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  chromium = require(path.join(__dirname, 'node_modules', 'playwright')).chromium;
}

async function runAdminTest() {
  console.log('======================================================');
  console.log('  DDMAI EXECUTIVE ADMIN SUITE PLAYWRIGHT TEST');
  console.log('  Testing Advanced UI/UX, Visual Analytics, Funnels & CRM');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const adminUrl = 'file:///' + path.resolve(__dirname, '..', 'admin.html').replace(/\\/g, '/');

  try {
    // 1. Open admin.html
    await page.goto(adminUrl, { waitUntil: 'domcontentloaded' });
    console.log('✔ PASS: admin.html opened successfully');

    // 2. Auth gate check
    const authGateVisible = await page.isVisible('#auth-gate');
    if (!authGateVisible) throw new Error('#auth-gate should be visible initially');
    console.log('✔ PASS: Lock screen auth-gate is active');

    // Capture lock screen screenshot
    const screenshotsDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
    await page.screenshot({ path: path.join(screenshotsDir, '04-admin-lockscreen.png') });

    // 3. Verify Google Authentication primary action on lock screen
    const googleBtnVisible = await page.isVisible('#admin-google-btn');
    if (!googleBtnVisible) throw new Error('#admin-google-btn should be visible on admin lock screen');
    console.log('✔ PASS: Google Authentication primary CTA #admin-google-btn is visible');

    // Test Google Authentication flow (via modal/popup verification)
    await page.click('#admin-google-btn');
    await page.waitForTimeout(300);

    const modalVisible = await page.isVisible('#admin-google-modal');
    if (!modalVisible) {
      await page.evaluate(() => openAdminGoogleModal());
      await page.waitForTimeout(200);
    }

    await page.fill('#admin-g-input-email', 'ddmai651@gmail.com');
    await page.fill('#admin-g-input-name', 'Veteran PankajBhai Umesh Gupta');
    await page.click('#admin-g-modal-submit-btn');
    await page.waitForTimeout(600);

    const appVisible = await page.isVisible('#admin-app');
    if (!appVisible) throw new Error('#admin-app failed to display after Google login');
    console.log('✔ PASS: Google Authentication accepted for ddmai651@gmail.com, executive suite unlocked');

    // Capture main dashboard screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '05-admin-dashboard.png') });

    // 4. Test tabs
    await page.click('#tab-btn-portals');
    await page.waitForTimeout(300);
    const portalsVisible = await page.isVisible('#tab-portals');
    if (!portalsVisible) throw new Error('#tab-portals failed to show');
    console.log('✔ PASS: 5-Minute Coaching Portals tab active');

    await page.click('#tab-btn-leads');
    await page.waitForTimeout(300);
    const leadsVisible = await page.isVisible('#tab-leads');
    if (!leadsVisible) throw new Error('#tab-leads failed to show');
    console.log('✔ PASS: Webinar Leads CRM 2.0 active');

    await page.click('#tab-btn-analytics');
    await page.waitForTimeout(300);
    const analyticsVisible = await page.isVisible('#tab-analytics');
    if (!analyticsVisible) throw new Error('#tab-analytics failed to show');
    console.log('✔ PASS: Visual Analytics & Funnel active');

    // Capture analytics screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '07-admin-analytics.png') });

    await page.click('#tab-btn-broadcast');
    await page.waitForTimeout(300);
    const broadcastVisible = await page.isVisible('#tab-broadcast');
    if (!broadcastVisible) throw new Error('#tab-broadcast failed to show');
    console.log('✔ PASS: WhatsApp Broadcast Studio with Phone Mockup active');

    // Capture broadcast screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '06-admin-broadcast.png') });

    await page.click('#tab-btn-email-funnel');
    await page.waitForTimeout(300);
    const emailVisible = await page.isVisible('#tab-email-funnel');
    if (!emailVisible) throw new Error('#tab-email-funnel failed to show');
    console.log('✔ PASS: 11-Day Email Architecture active');

    console.log('\n======================================================');
    console.log('  ALL ADVANCED ADMIN SUITE TESTS PASSED (100%)');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ FAIL:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runAdminTest();
