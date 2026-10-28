const { chromium } = require('d:/Open Code/DAsp/playwright.cli/node_modules/playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const imgData = fs.readFileSync('D:/Open Code/DAsp/assets/ddmai-logo.jpg').toString('base64');
  
  for (const size of [512, 192]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`
      <body style="margin:0;padding:0;overflow:hidden;background:#061B49;display:flex;align-items:center;justify-content:center;">
        <img src="data:image/jpeg;base64,${imgData}" style="max-width:${size}px;max-height:${size}px;object-fit:contain;" />
      </body>
    `);
    const buf = await page.screenshot({ type: 'png' });
    fs.writeFileSync(`D:/Open Code/DAsp/public/icon-${size}.png`, buf);
    console.log(`Generated icon-${size}.png (${buf.length} bytes)`);
  }
  await browser.close();
  console.log('ALL ICONS GENERATED SUCCESSFULLY!');
})();
