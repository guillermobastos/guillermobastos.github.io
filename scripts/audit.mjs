import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const port = 4322;
const url = `http://127.0.0.1:${port}`;
const target = process.argv[2] || '/';
if (!target.startsWith('/') || target.startsWith('//')) throw new Error('Pass a local path, for example /proyectos/hidropronos/');
const reportName = target === '/' ? '' : target.split('/').filter(Boolean).join('-') + '-';
const server = spawn(process.execPath, ['./node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)], { stdio: 'ignore' });
let chrome;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error('The preview server did not start. Run npm run build first.');
  await mkdir('.lighthouseci', { recursive: true });
  chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [name, config] of [['mobile', undefined], ['desktop', desktopConfig]]) {
    const result = await lighthouse(new URL(target, url).href, { port: chrome.port, output: ['html', 'json'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, config);
    if (!result) throw new Error('Lighthouse did not return a report.');
    await writeFile(`.lighthouseci/${reportName}${name}.html`, result.report[0]);
    await writeFile(`.lighthouseci/${reportName}${name}.json`, result.report[1]);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    console.log(name, JSON.stringify(scores));
    for (const key of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift']) {
      console.log(`  ${key}: ${result.lhr.audits[key].displayValue}`);
    }
    const failures = Object.values(result.lhr.audits).filter(audit => audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'informative');
    console.log('  Review:', failures.map(audit => audit.id).join(', ') || 'no failed audits');
    if (['performance', 'accessibility', 'seo'].some(key => scores[key] < 90)) process.exitCode = 1;
  }
} finally {
  if (chrome) chrome.kill();
  server.kill();
}
