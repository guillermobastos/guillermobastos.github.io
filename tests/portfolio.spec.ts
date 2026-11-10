import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the profile and supports project navigation and technical disclosure', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.screenshot({ path: test.info().outputPath('portfolio.png'), animations: 'disabled' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Guillermo\s*Bastos Ribas\./);
  await expect(page.locator('.robot-svg')).toBeVisible();
  await expect(page.locator('.repository-projects .iso-preview')).toHaveCount(5);
  await expect(page.locator('.impact-item')).toHaveCount(4);
  await expect(page.locator('.impact-value').first()).toHaveText('0,901F1');
  expect(await page.locator('.impact-description').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
  await page.locator('#impacto').screenshot({ path: test.info().outputPath('impacto.png'), animations: 'disabled', scale: 'css' });
  await page.getByRole('link', { name: 'Ver proyectos' }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  const details = page.locator('#hidropronos details');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open', '');
  await expect(details).toContainText('2021');
  await expect(page.locator('.repository-projects .project-card')).toHaveCount(5);
  const repositories = ['capitalink', 'raceway-rust-sensores', 'raceway-rust-valvulas', 'vixiaweb', 'hidropronos'];
  for (const repository of repositories) {
    const link = page.locator(`.project-repository[href="https://github.com/guillermobastos/${repository}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  await expect(page.locator('.additional-projects .project-card')).toHaveCount(4);
  await page.locator('.additional-projects > summary').click();
  await expect(page.locator('#hidrocarburos')).toBeVisible();
  expect(errors).toEqual([]);
});

test('has no horizontal overflow, including narrow screens', async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => ({
      exceeds: document.documentElement.scrollWidth > window.innerWidth,
      elements: [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > window.innerWidth + 1).map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })),
    }));
    expect(overflow.exceeds, `horizontal overflow at ${width}px: ${JSON.stringify(overflow.elements)}`).toBe(false);
  }
});

test('passes WCAG AA automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('details').evaluateAll(items => items.forEach(item => item.setAttribute('open', '')));
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});

test('keeps content and technical disclosures usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole('heading', { name: 'El stack sigue al problema.' })).toBeVisible();
  await page.locator('#hidropronos summary').click();
  await expect(page.locator('#hidropronos details')).toHaveAttribute('open', '');
  await page.locator('.additional-projects > summary').click();
  await page.locator('#blooms summary').click();
  await expect(page.locator('#blooms details')).toHaveAttribute('open', '');
  await context.close();
});

test('supports reduced motion and keyboard navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#contenido')).toBeFocused();
  const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(behavior).toBe('auto');
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
});

test('serves a real PDF, social image, SEO metadata and valid local anchors', async ({ page, request }) => {
  await page.goto('/');
  const pdf = await request.get('/cv.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const image = await request.get('/og.png');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}');
  expect(person['@type']).toBe('Person');
  expect(person.name).toBe('Guillermo Bastos Ribas');
  const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(hash => !document.getElementById(hash.slice(1))));
  expect(broken).toEqual([]);
});
