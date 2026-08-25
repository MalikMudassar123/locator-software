const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport:{width:375,height:812} });
  await p.goto('http://localhost:3000/service/fleet-telematics', { waitUntil:'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: dir+'/mobile-fix.png' });
  await b.close();
})();
