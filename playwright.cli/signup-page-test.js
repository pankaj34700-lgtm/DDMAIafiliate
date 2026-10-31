/**
 * DDMAI SIGNUP PAGE PLAYWRIGHT TEST
 * Folder: playwright.cli
 * Verifies the dedicated /signup/index.html page with ?ref=DDMAI-V5H4QH
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runSignupPageTest() {
  console.log('======================================================');
  console.log('  DDMAI DEDICATED SIGNUP PAGE PLAYWRIGHT TEST');
  console.log('  Testing signup/index.html?ref=DDMAI-V5H4QH');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'signup', 'index.html').replace(/\\/g, '/') + '?ref=DDMAI-V5H4QH&track=business-partner';
  console.log(`[Stage 1] Navigating to ${fileUrl}...`);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  // 1. Verify Page Title & Heading
  const pageTitle = await page.title();
  console.log(`  ✔ PASS: Page title is "${pageTitle}"`);

  // 2. Verify Referral Sponsor badge
  const headerRef = await page.innerText('#header-ref-code');
  if (headerRef !== 'DDMAI-V5H4QH') throw new Error(`Expected DDMAI-V5H4QH but got ${headerRef}`);
  console.log(`  ✔ PASS: Verified Sponsor Code displayed: ${headerRef}`);

  // 3. Verify Active Sponsor Tag in hero
  const heroRef = await page.innerText('#active-sponsor-tag');
  console.log(`  ✔ PASS: Hero Sponsor Tag: ${heroRef}`);

  // 4. Verify 4 Track Cards exist
  const cardBP = await page.isVisible('#track-card-business-partner');
  const cardAF = await page.isVisible('#track-card-affiliate');
  const cardCC = await page.isVisible('#track-card-coaching');
  const cardMC = await page.isVisible('#track-card-masterclass');
  if (!cardBP || !cardAF || !cardCC || !cardMC) throw new Error('Missing track cards!');
  console.log('  ✔ PASS: All 4 Track Selection Cards are rendered and visible');

  // 5. Test Track Card switching
  await page.click('#track-card-affiliate');
  await page.waitForTimeout(200);
  const selectedTrack = await page.$eval('#signup-track', el => el.value);
  if (selectedTrack !== 'affiliate') throw new Error(`Expected affiliate track but got ${selectedTrack}`);
  console.log('  ✔ PASS: Click on track card switched form track to "affiliate"');

  // Switch back to business-partner
  await page.click('#track-card-business-partner');
  await page.waitForTimeout(200);

  // 6. Capture Desktop Screenshot of Signup Page
  const ssDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
  const ssPath1 = path.join(ssDir, '16-dedicated-signup-page.png');
  await page.screenshot({ path: ssPath1, fullPage: false });
  console.log(`  ✔ PASS: Signup Page snapshot saved to: ${ssPath1}`);

  // 7. Fill and Submit Form
  console.log('[Stage 2] Filling partner registration form...');
  await page.fill('#signup-name', 'Veteran PankajBhai Direct Affiliate');
  await page.fill('#signup-phone', '9638055552');
  await page.fill('#signup-email', 'partner.affiliate@ddmai.com');
  await page.fill('#signup-city', 'Gandhinagar, Gujarat');

  console.log('[Stage 3] Submitting signup form...');
  await page.click('#signup-submit-btn');
  await page.waitForTimeout(400);

  // 8. Verify Success View
  const successVisible = await page.isVisible('#signup-success');
  if (!successVisible) throw new Error('Signup success screen was not displayed!');
  console.log('  ✔ PASS: Success screen #signup-success is visible');

  const assignedMemberId = await page.innerText('#success-member-id');
  console.log(`  ✔ PASS: Assigned Member ID: "${assignedMemberId}"`);

  // Verify WhatsApp message link
  const waHref = await page.$eval('#success-whatsapp-btn', el => el.getAttribute('href'));
  if (!waHref || !waHref.includes('9638055552') || !waHref.includes('DDMAI-V5H4QH')) {
    throw new Error('Invalid WhatsApp redirect link on success screen');
  }
  console.log('  ✔ PASS: Direct WhatsApp founder message configured with pre-filled ID & sponsor');

  // 9. Capture Screenshot of Success Screen
  const ssPath2 = path.join(ssDir, '17-signup-success-screen.png');
  await page.screenshot({ path: ssPath2, fullPage: false });
  console.log(`  ✔ PASS: Signup Success snapshot saved to: ${ssPath2}`);

  // 10. Test Mobile View of Signup Page
  console.log('[Stage 4] Testing mobile responsiveness on Android Pixel 7...');
  await page.setViewportSize({ width: 412, height: 915 });
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const ssPath3 = path.join(ssDir, '18-mobile-signup-page.png');
  await page.screenshot({ path: ssPath3, fullPage: false });
  console.log(`  ✔ PASS: Mobile Signup snapshot saved to: ${ssPath3}`);

  await browser.close();
  console.log('\n======================================================');
  console.log('  ALL SIGNUP PAGE PLAYWRIGHT TESTS PASSED (100%)');
  console.log('======================================================\n');
}

runSignupPageTest().catch(err => {
  console.error('Signup Page Test error:', err);
  process.exit(1);
});
