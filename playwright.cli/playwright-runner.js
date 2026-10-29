/**
 * DDMAI PLAYWRIGHT BROWSER AUTOMATION TEST RUNNER
 * Folder: playwright.cli
 * End-to-End browser verification for Digital Direct Marketing – AI & Tech
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const indexUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
const screenshotsDir = path.join(__dirname, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function logPass(name) {
  totalTests++;
  passedTests++;
  console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name}`);
}

function logFail(name, err) {
  totalTests++;
  failedTests++;
  console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${name} (${err?.message || err})`);
}

async function runPlaywrightSuite() {
  console.log('\n======================================================');
  console.log('  DDMAI PLAYWRIGHT BROWSER CLI SUITE (playwright.cli)');
  console.log('  Target URL: ' + indexUrl);
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. Navigation & Page Load
    console.log('\x1b[36m[Stage 1] Browser Navigation & Initial Render\x1b[0m');
    await page.goto(indexUrl, { waitUntil: 'load' });
    const title = await page.title();
    if (title.includes('Digital Direct Marketing – AI & Tech') && title.includes('PankajBhai Umesh Gupta')) {
      logPass(`Page title correct: "${title}"`);
    } else {
      logFail('Page title validation', `Unexpected title: ${title}`);
    }

    // Capture Full Desktop Preview
    const desktopScreenshotPath = path.join(screenshotsDir, '01-desktop-home.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    logPass(`Desktop snapshot captured: screenshots/01-desktop-home.png`);

    // 2. DOM Elements & Visibility
    console.log('\n\x1b[36m[Stage 2] Structural Sections & Identity Verification\x1b[0m');
    const sections = ['#home', '#founder', '#services', '#plans', '#masterclass', '#how-it-works', '#help'];
    for (const sec of sections) {
      const isVisible = await page.isVisible(sec);
      if (isVisible) {
        logPass(`Section "${sec}" is rendered and visible`);
      } else {
        logFail(`Section "${sec}" visibility check`);
      }
    }

    // Check Founder Details
    const founderName = await page.locator('text=Veteran PankajBhai Umesh Gupta').first().innerText();
    if (founderName) {
      logPass(`Founder headline verified: "${founderName}"`);
    } else {
      logFail('Founder headline not found');
    }

    // 3. Tab Switcher Interaction
    console.log('\n\x1b[36m[Stage 3] Interactive Tab Switching\x1b[0m');
    await page.click('#tab-btn-coaching');
    const coachingVal = await page.inputValue('#hero-objective');
    if (coachingVal === 'portal') {
      logPass('Tab click "#tab-btn-coaching" switched hero objective to "portal"');
    } else {
      logFail('Coaching tab switch check', `Expected "portal", got "${coachingVal}"`);
    }

    // 4. Modal 1: Welcome Letter (?print=1 certificate view)
    console.log('\n\x1b[36m[Stage 4] Modal: Official Welcome Letter (?print=1 style)\x1b[0m');
    await page.evaluate(() => openWelcomeLetter());
    await page.waitForTimeout(300);
    const welcomeVisible = await page.isVisible('#welcome-letter-modal');
    if (welcomeVisible) {
      logPass('Welcome Letter Modal opened successfully');
      const certPath = path.join(screenshotsDir, '02-welcome-certificate.png');
      await page.screenshot({ path: certPath });
      logPass(`Certificate screenshot saved: screenshots/02-welcome-certificate.png`);
    } else {
      logFail('Welcome Letter Modal failed to open');
    }
    await page.evaluate(() => closeWelcomeLetter());
    await page.waitForTimeout(200);

    // 5. Modal 2: Webinar Masterclass Registration Form
    console.log('\n\x1b[36m[Stage 5] Modal: Webinar Registration & Lead Capture Flow\x1b[0m');
    await page.evaluate(() => openWebinarModal());
    await page.waitForTimeout(300);
    const webinarVisible = await page.isVisible('#webinar-modal');
    if (webinarVisible) {
      logPass('Webinar Registration Modal opened successfully');
    } else {
      logFail('Webinar Modal failed to open');
    }

    // Fill form fields
    await page.fill('#reg-name', 'Test Student Kumar');
    await page.fill('#reg-phone', '9876543210');
    await page.fill('#reg-email', 'teststudent@ddmai.example');
    await page.selectOption('#reg-painpoint', 'portal');
    logPass('Form inputs (Name, Phone, Email, Objective) populated successfully');

    // Submit form
    await page.click('#webinar-form button[type="submit"]');
    await page.waitForTimeout(300);

    const successVisible = await page.isVisible('#webinar-success');
    if (successVisible) {
      logPass('Form submission triggered success screen (#webinar-success)');
      const waLink = await page.getAttribute('#whatsapp-redirect-btn', 'href');
      if (waLink && waLink.includes('web.whatsapp.com') && waLink.includes('919638055552')) {
        logPass(`WhatsApp redirect generated with pre-filled message & phone +919638055552`);
      } else {
        logFail('WhatsApp redirect link check', waLink);
      }
      const webinarModalSnap = path.join(screenshotsDir, '03-webinar-confirmation.png');
      await page.screenshot({ path: webinarModalSnap });
      logPass(`Confirmation screenshot saved: screenshots/03-webinar-confirmation.png`);
    } else {
      logFail('Form submission failed to show success screen');
    }

    // 6. Zero Legacy Content In Rendered Page
    console.log('\n\x1b[36m[Stage 6] Rendered Page Text Audit (No ILH / No tutorkhoji)\x1b[0m');
    const bodyText = await page.innerText('body');
    const hasTutorkhoji = /tutorkhoji/i.test(bodyText);
    const hasILH = /\bILH\b/i.test(bodyText);
    const hasOldRef = /TK-V5H4QH/i.test(bodyText);

    if (!hasTutorkhoji) {
      logPass('Zero occurrences of "tutorkhoji" in rendered DOM text');
    } else {
      logFail('Rendered text contains "tutorkhoji"');
    }

    if (!hasILH) {
      logPass('Zero occurrences of "ILH" in rendered DOM text');
    } else {
      logFail('Rendered text contains "ILH"');
    }

    if (!hasOldRef) {
      logPass('Zero occurrences of "TK-V5H4QH" in rendered DOM text');
    } else {
      logFail('Rendered text contains "TK-V5H4QH"');
    }

  } catch (err) {
    logFail('Playwright execution error', err);
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n======================================================');
  console.log(`  PLAYWRIGHT SUMMARY: Tests: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
  if (failedTests === 0) {
    console.log('  \x1b[32m✔ PLAYWRIGHT CLI BROWSER SUITE: ALL ACTIONS COMPLETED SUCCESSFULLY!\x1b[0m');
  } else {
    console.log('  \x1b[31m✖ PLAYWRIGHT SUITE FAILED SOME CHECKS\x1b[0m');
  }
  console.log('======================================================\n');

  process.exit(failedTests === 0 ? 0 : 1);
}

runPlaywrightSuite();
