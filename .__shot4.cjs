const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch({ channel: 'chrome' });
  const sizes = [[1440,900],[1280,720],[1024,768],[768,900],[390,844]];
  for (const [w,h] of sizes) {
    const p = await b.newPage({ viewport:{width:w,height:h} });
    await p.goto('http://localhost:3000/service/fleet-telematics', { waitUntil:'networkidle' });
    await p.waitForTimeout(500);
    await p.screenshot({ path: dir+'/hero-'+w+'x'+h+'.png' });
    await p.close();
  }
  await b.close();
})();
