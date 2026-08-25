const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport:{width:1280,height:1000} });
  const errs = [];
  p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR: '+e.message));
  await p.goto('http://localhost:3000/about/career', { waitUntil:'networkidle' });
  await p.locator('#open-positions').scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
  await p.locator('#open-positions').screenshot({ path: dir+'/career-list.png' });
  // open the Location dropdown
  await p.getByRole('button', { name: /Location/ }).click();
  await p.waitForTimeout(400);
  await p.locator('#open-positions').screenshot({ path: dir+'/career-open.png' });
  console.log('flags in rows:', await p.locator('.cjl-row-loc img').count());
  console.log('options:', await p.locator('.fsl-opt').count(), 'opt imgs:', await p.locator('.fsl-opt img').count());
  console.log('console errors:', errs.length ? errs.slice(0,5) : 'none');
  await b.close();
})();
