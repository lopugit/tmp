import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.SITE_URL || 'http://127.0.0.1:18747';
const evidence = process.env.EVIDENCE_DIR || 'test-results';
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, chromiumSandbox: true, ...(process.env.BROWSER_EXECUTABLE ? {executablePath:process.env.BROWSER_EXECUTABLE}: {}) });
const results = [];
try {
  for (const [label, width, height] of [['desktop',1440,1000],['laptop',1280,800],['tablet',768,1024],['mobile',375,812]]) {
    const context = await browser.newContext({ viewport: {width,height}, reducedMotion:'reduce' });
    await context.tracing.start({ screenshots:true, snapshots:true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base, {waitUntil:'networkidle'});
    await page.locator('main').waitFor();
    assert.equal(await page.locator('h1').count(), 1);
    assert.match(await page.locator('h1').innerText(), /Candoux 4/i);
    const pageHeight = await page.evaluate(()=>document.documentElement.scrollHeight);
    for (let y=0; y < pageHeight; y += height * .75) {
      await page.evaluate(y => window.scrollTo(0,y), y);
      await page.waitForTimeout(80);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1), `${label}: horizontal overflow`);
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    for (const detail of await page.locator('details').all()) {
      await detail.locator('summary').click();
      assert.equal(await detail.getAttribute('open'), '');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1));
      await detail.locator('summary').click();
    }
    await page.getByRole('button', {name:'Summer',exact:true}).click();
    await page.getByRole('heading', {name:'Take the long way round.'}).waitFor();
    await page.waitForFunction(()=>document.querySelector('img[src="/images/buller-summer.jpg"]')?.naturalWidth > 0);
    await page.screenshot({path:`${evidence}/${label}-summer.png`,fullPage:true});
    await page.getByRole('button', {name:'Winter',exact:true}).click();
    await page.getByRole('button', {name:'View all 7 photos',exact:true}).click();
    const gallery = page.getByRole('dialog', {name:'Candoux 4 photos'});
    await gallery.waitFor({state:'visible'});
    await page.getByRole('button', {name:'Next photo',exact:true}).click();
    assert.match(await gallery.innerText(), /2 of 7/i);
    await page.keyboard.press('ArrowLeft');
    assert.match(await gallery.innerText(), /1 of 7/i);
    await page.keyboard.press('ArrowLeft');
    assert.match(await gallery.innerText(), /7 of 7/i);
    for (let photo=1;photo<=7;photo++) {
      await page.getByRole('button', {name:'Next photo',exact:true}).click();
      await page.waitForFunction(()=>{const image=document.querySelector('.gallery-dialog img');return image?.complete&&image?.naturalWidth>0;});
      assert.match(await gallery.innerText(), new RegExp(`${photo} of 7`,'i'));
      assert.ok(await gallery.locator('img').isVisible());
    }
    for (const key of ['Tab','Shift+Tab']) {
      for (let step=0;step<5;step++) {
        await page.keyboard.press(key);
        assert.equal(await gallery.evaluate(e=>e.contains(document.activeElement)),true,'gallery focus stays in dialog');
      }
    }
    await page.screenshot({path:`${evidence}/${label}-gallery.png`});
    await page.keyboard.press('Escape');
    await gallery.waitFor({state:'hidden'});
    assert.equal(await page.getByRole('button',{name:'View all 7 photos',exact:true}).evaluate(e=>e===document.activeElement),true);
    await page.getByRole('button',{name:'Open menu',exact:true}).click();
    const drawer = page.getByRole('dialog',{name:'Explore Candoux 4'});
    await page.waitForFunction(()=>Math.abs(document.querySelector('#site-menu').getBoundingClientRect().x)<1);
    const bounds = await drawer.boundingBox();
    assert.equal(bounds.x,0); assert.equal(bounds.y,0); assert.ok(Math.abs(bounds.height-height)<2);
    for (let tab=0;tab<9;tab++) {
      await page.keyboard.press('Tab');
      assert.equal(await drawer.evaluate(e=>e.contains(document.activeElement)),true,'menu focus stays in dialog');
    }
    for (let tab=0;tab<9;tab++) {
      await page.keyboard.press('Shift+Tab');
      assert.equal(await drawer.evaluate(e=>e.contains(document.activeElement)),true,'reverse menu focus stays in dialog');
    }
    await page.screenshot({path:`${evidence}/${label}-menu.png`});
    await page.keyboard.press('Escape');
    await drawer.waitFor({state:'hidden'});
    assert.equal(await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(e=>e===document.activeElement),true);
    await page.getByRole('button',{name:'Open menu',exact:true}).click();
    await drawer.getByRole('link',{name:/Getting here/}).click();
    await drawer.waitFor({state:'hidden'});
    assert.match(page.url(), /#journey$/);
    assert.equal(await page.getByRole('link',{name:'Book Candoux 4',exact:true}).first().getAttribute('href'),'https://bookings12.rmscloud.com/Search/Index/10604/1/?catIds=70');
    const buttons = await page.getByRole('button').all();
    const buttonLabels = [];
    for (const b of buttons) buttonLabels.push(await b.getAttribute('aria-label') || await b.innerText());
    const brokenImages = await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete || !i.naturalWidth).map(i=>i.src));
    assert.deepEqual(brokenImages, [], `${label}: broken images`);
    assert.deepEqual(errors, [], `${label}: runtime errors`);
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`${evidence}/${label}.png`,fullPage:true});
    await page.screenshot({path:`${evidence}/${label}-hero.png`});
    results.push({label,width,height,title:await page.title(),errors,brokenImages,buttonLabels});
    await context.tracing.stop({path:`${evidence}/${label}-trace.zip`});
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(`${evidence}/results.json`, JSON.stringify({base, checkedAt:new Date().toISOString(),results},null,2));
console.log(JSON.stringify({base,results},null,2));
