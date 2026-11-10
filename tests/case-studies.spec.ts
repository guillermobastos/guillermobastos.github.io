import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const cases = [
  ['hidropronos', 'HidroPronos'],
  ['raceway-rust-valvulas', 'Raceway · Control de válvulas'],
  ['raceway-rust-sensores', 'Raceway · Red de sensores'],
  ['capitalink', 'CapitalInk'],
  ['vixiaweb', 'Vixia Web'],
] as const;

for (const [slug, title] of cases) {
  test(`${slug}: renders its isometric case study, evidence and accessible controls`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/proyectos/${slug}/`);
    await expect(page).toHaveTitle(`${title} · Proyecto | Guillermo Bastos`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('.iso-svg')).toHaveAttribute('role', 'img');
    await expect(page.locator('.case-metrics article')).toHaveCount(4);
    expect(await page.locator('.case-intro').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
    await expect(page.locator('.evidence-chart')).toBeVisible();
    if (slug === 'hidropronos') {
      await expect(page.locator('.hydro-chart-card')).toHaveCount(4);
      await expect(page.locator('.hydro-heatmap tbody td')).toHaveCount(12);
      await page.locator('.hydro-results').screenshot({ path: test.info().outputPath('hidropronos-results.png'), animations: 'disabled', scale: 'css' });
    } else {
      await expect(page.locator('.architecture-map')).toBeVisible();
      expect(await page.locator('.architecture-map .map-node').count()).toBeGreaterThanOrEqual(3);
      await page.locator('.architecture-map').screenshot({ path: test.info().outputPath(`${slug}-map.png`), animations: 'disabled', scale: 'css' });
    }
    await page.locator('.iso-layer-controls').getByText('Entrada', { exact: true }).click();
    await expect(page.getByRole('radio', { name: 'Entrada', exact: true })).toBeChecked();
    await expect.poll(() => page.locator('[data-iso-layer="output"]').evaluate(el => getComputedStyle(el).opacity)).toBe('0.12');
    await page.locator('.iso-layer-controls').getByText('Sistema completo', { exact: true }).click();
    await page.locator('.iso-figure').screenshot({ path: test.info().outputPath(`${slug}-isometric.png`), animations: 'disabled' });
    if (slug === 'hidropronos' || slug === 'capitalink') {
      await page.locator('.case-hero').screenshot({ path: test.info().outputPath(`${slug}-hero.png`), animations: 'disabled', scale: 'css' });
    }

    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}');
    expect(schema['@graph'].some((item: { '@type': string }) => item['@type'] === 'CreativeWork')).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://guillermobastos.github.io/proyectos/${slug}/`);
    const socialImage = await request.get(`/proyectos/${slug}/og.png`);
    expect(socialImage.ok()).toBe(true);
    expect((await socialImage.body()).subarray(1, 4).toString()).toBe('PNG');

    const response = await request.get(`/proyectos/${slug}/datos.json`);
    expect(response.ok()).toBe(true);
    const snapshot = await response.json();
    expect(snapshot.project).toBe(slug);
    expect(snapshot.revision).toMatch(/^[a-f0-9]{40}$/);
    for (const source of snapshot.sources) {
      expect(source.url).toContain(`/blob/${snapshot.revision}/`);
      await expect(page.locator(`#fuente-${source.id}`)).toHaveCount(1);
    }
    const sourceIds = snapshot.sources.map((source: { id: string }) => source.id);
    for (const entry of [...snapshot.metrics, snapshot.chart, snapshot.table]) expect(sourceIds).toContain(entry.source);
    for (const row of snapshot.chart.rows) {
      expect(row.values).toHaveLength(snapshot.chart.series.length);
      for (const value of row.values) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(snapshot.chart.max);
      }
    }

    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(hash => !document.getElementById(hash.slice(1))));
    expect(brokenAnchors).toEqual([]);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${slug} at ${width}px`).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test('preserves original numeric results and the distinction between experiment and configuration', async ({ request }) => {
  const hidro = await (await request.get('/proyectos/hidropronos/datos.json')).json();
  expect(hidro.observations).toHaveLength(12);
  expect(hidro.metrics.find((metric: { label: string }) => metric.label.startsWith('F1')).value).toBe('0,901');
  expect(hidro.chart.rows[0].values).toEqual([0.8780487804878049, 0.9090909090909091]);
  expect(hidro.table.rows.map((row: string[]) => row[1])).toEqual(['410', '675', '702']);
  const capitalink = await (await request.get('/proyectos/capitalink/datos.json')).json();
  expect(capitalink.chart.rows.map((row: { values: number[] }) => row.values[0])).toEqual([0, 49, 99, 249]);
  expect(capitalink.chart.context).toContain('no ingresos');
});

test('supports the personal robot greeting, viewport pause and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const avatar = page.locator('[data-avatar]');
  await expect(avatar).toHaveAttribute('data-enhanced', 'true');
  await avatar.scrollIntoViewIfNeeded();
  await expect(avatar).toHaveAttribute('data-in-view', 'true');
  const greeting = page.getByRole('button', { name: 'Saludar al avatar GB–01' });
  await greeting.click();
  await expect(greeting).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('.robot-arm-right').evaluate(el => getComputedStyle(el).animationName)).toBe('robot-wave');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.robot-arm-right').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(avatar).toHaveAttribute('data-in-view', 'false');
});

test('lets readers change the AUCPR horizon without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/proyectos/hidropronos/`);
  await page.getByRole('radio', { name: 'h1 · +1 día', exact: true }).check();
  await expect(page.locator('.horizon-h1')).toBeVisible();
  await expect(page.locator('.horizon-h0')).toBeHidden();
  await expect(page.locator('.horizon-h1 .aucpr-values')).toContainText('0,983');
  await expect(page.locator('.hydro-heatmap tbody tr')).toHaveCount(6);
  await context.close();
});

test('links the five case studies from the home page and includes them in the sitemap', async ({ page, request }) => {
  await page.goto('/');
  for (const [slug] of cases) await expect(page.locator(`a.project-case-link[href="/proyectos/${slug}/"]`)).toHaveCount(1);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const [slug] of cases) expect(sitemap).toContain(`https://guillermobastos.github.io/proyectos/${slug}/`);
  await page.locator('a.project-case-link[href="/proyectos/capitalink/"]').click();
  await expect(page).toHaveURL(/\/proyectos\/capitalink\/$/);
  await page.getByRole('link', { name: 'Todos los proyectos', exact: true }).click();
  await expect(page).toHaveURL(/\/#proyectos$/);
});

test('keeps isometric layer selection, data and navigation functional without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/proyectos/raceway-rust-sensores/`);
  await page.locator('.iso-layer-controls').getByText('Salida', { exact: true }).click();
  await expect(page.getByRole('radio', { name: 'Salida', exact: true })).toBeChecked();
  await expect.poll(() => page.locator('[data-iso-layer="input"]').evaluate(el => getComputedStyle(el).opacity)).toBe('0.12');
  await expect(page.getByRole('heading', { name: 'La configuración real de adquisición' })).toBeVisible();
  await page.locator('.case-next-project').click();
  await expect(page).toHaveURL(/\/proyectos\/capitalink\/$/);
  await context.close();
});
