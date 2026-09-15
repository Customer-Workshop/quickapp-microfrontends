import { test, expect } from '@playwright/test';

test('root redirects to /home and renders shell layout', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/home$/);

  const nav = page.locator('nav.navbar');
  await expect(nav).toBeVisible();
  for (const label of ['Home', 'Identity', 'Customers', 'Orders', 'Products']) {
    await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
  }

  await expect(
    page.getByRole('heading', {
      name: 'Decomposed Application — Micro-Frontend Shell',
    })
  ).toBeVisible();
});
