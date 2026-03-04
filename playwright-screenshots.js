const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  console.log("Starting full QA test on all routes...");
  // Using headless: true since we just want screenshots dumped to folder
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  const routes = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/portfolio', name: 'portfolio' },
    { path: '/previews', name: 'previews' }
  ];

  for (const route of routes) {
    for (const v of viewports) {
      console.log(`Capturing ${route.name} on ${v.name}...`);
      await page.setViewportSize({ width: v.width, height: v.height });
      await page.goto(`${TARGET_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 20000 });

      // Wait for GSAP entrance animations to finish settling
      await page.waitForTimeout(3000);

      const filePath = `/Users/dracoseven/hyperrealism/screenshot-${route.name}-${v.name}.png`;
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✅ Saved: ${filePath}`);
    }
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
})();
