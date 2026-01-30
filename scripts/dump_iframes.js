const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.swifttranslator.com/', { timeout: 60000 });
  console.log('Main page loaded. Iframes:');
  const iframes = page.frames();
  for (const f of iframes) {
    try {
      console.log('--- frame: ' + f.url());
      const html = await f.content();
      console.log(html.slice(0, 2000));
    } catch (e) {
      console.log('  (could not read content—possibly cross-origin) ' + e.message);
    }
  }
  await browser.close();
})();