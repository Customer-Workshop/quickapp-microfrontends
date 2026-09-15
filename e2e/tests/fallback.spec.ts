import { test, expect } from '@playwright/test';

const homeHeading = 'Decomposed Application — Micro-Frontend Shell';

test('unknown route redirects to /home', async ({ page }) => {
  await page.goto('/does-not-exist');

  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByRole('heading', { name: homeHeading })).toBeVisible();
});

test('deep unknown route under a remote redirects to /home', async ({
  page,
}) => {
  await page.goto('/customers/unknown/deep');

  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByRole('heading', { name: homeHeading })).toBeVisible();
});
