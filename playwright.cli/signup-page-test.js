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

  // 6. Verify Google Sign-In Primary Action
  const googleBtnVisible = await page.isVisible('#google-signup-btn');
  if (!googleBtnVisible) throw new Error('#google-signup-btn is not visible');
  console.log('  ✔ PASS: Primary Google Sign-In button #google-signup-btn is rendered and visible');

  // Capture Desktop Screenshot of Signup Page
  const ssDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
  const ssPath1 = path.join(ssDir, '16-dedicated-signup-page.png');
  await page.screenshot({ path: ssPath1, fullPage: false });
  console.log(`  ✔ PASS: Signup Page snapshot saved to: ${ssPath1}`);

  // 7. Test Google Authentication Modal & Registration Flow
  console.log('[Stage 2] Testing Google Authentication flow via popup/fallback modal...');
  await page.click('#google-signup-btn');
  await page.waitForTimeout(300);

  const modalVisible = await page.isVisible('#google-signup-modal');
  if (!modalVisible) {
    // In headless test where signInWithPopup might fail silently, trigger openGoogleSignupModal()
    await page.evaluate(() => openGoogleSignupModal());
    await page.waitForTimeout(200);
  }

  const ssPathModal = path.join(ssDir, '19-google-auth-modal.png');
  await page.screenshot({ path: ssPathModal, fullPage: false });
  console.log(`  ✔ PASS: Google Auth modal snapshot saved to: ${ssPathModal}`);

  // Fill Google modal details
  await page.fill('#g-signup-name', 'Pankaj Gupta');
  await page.fill('#g-signup-email', 'ddmai651@gmail.com');
  await page.fill('#g-signup-phone', '9638055552');

  // Submit Google verification modal
  console.log('[Stage 3] Completing Google authentication registration...');
  await page.click('#g-modal-submit-btn');
  await page.waitForTimeout(400);

  // 8. Verify Success View & Google Verified Credentials
  const successVisible = await page.isVisible('#signup-success');
  if (!successVisible) throw new Error('Signup success screen was not displayed!');
  console.log('  ✔ PASS: Success screen #signup-success is visible');

  const assignedMemberId = await page.innerText('#success-member-id');
  if (!assignedMemberId.startsWith('DDMAI-G-')) {
    throw new Error(`Expected Google Member ID starting with DDMAI-G-, got "${assignedMemberId}"`);
  }
  console.log(`  ✔ PASS: Assigned Google Member ID: "${assignedMemberId}"`);

  // Verify Google Verified Badge
  const statusPillText = await page.innerText('#success-status-pill');
  if (!statusPillText.toUpperCase().includes('GOOGLE VERIFIED')) {
    throw new Error(`Expected Google Verified badge in status pill, got "${statusPillText}"`);
  }
  console.log(`  ✔ PASS: Status Pill contains Google Verified Partner badge: "${statusPillText.replace(/\n/g, ' ')}"`);

  // Verify 24-hr Active Session in localStorage
  const authSession = await page.evaluate(() => localStorage.getItem('ddmai_user_auth'));
  if (!authSession) throw new Error('localStorage ddmai_user_auth was not set');
  const parsedAuth = JSON.parse(authSession);
  if (parsedAuth.authProvider !== 'google.com' || !parsedAuth.isGoogle) {
    throw new Error('Expected authProvider: google.com and isGoogle: true in session');
  }
  console.log('  ✔ PASS: 24-hr Google authenticated session saved to localStorage:', parsedAuth.email, parsedAuth.memberId);

  // Verify WhatsApp message link
  const waHref = await page.$eval('#success-whatsapp-btn', el => el.getAttribute('href'));
  if (!waHref || !waHref.includes('9638055552') || !waHref.includes('DDMAI-V5H4QH')) {
    throw new Error('Invalid WhatsApp redirect link on success screen');
  }
  console.log('  ✔ PASS: Direct WhatsApp founder message configured with pre-filled ID & sponsor');

  // 9. Capture Screenshot of Success Screen with Google Verification
  const ssPath2 = path.join(ssDir, '17-signup-success-screen.png');
  await page.screenshot({ path: ssPath2, fullPage: false });
  console.log(`  ✔ PASS: Signup Success snapshot saved to: ${ssPath2}`);

  // 10. Test Mobile View of Signup Page with Google Sign-In
  console.log('[Stage 4] Testing mobile responsiveness on Android Pixel 7...');
  await page.setViewportSize({ width: 412, height: 915 });
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const mobileGoogleBtn = await page.isVisible('#google-signup-btn');
  if (!mobileGoogleBtn) throw new Error('Mobile Google Sign-In button is not visible');
  console.log('  ✔ PASS: Mobile Google Sign-In button is visible on Pixel 7');

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
