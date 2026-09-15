import { test, expect } from '@playwright/test';
import { REMOTES } from '../helpers/remotes';

for (const remote of REMOTES) {
  test.describe(remote.name, () => {
    test('nav link loads remote list and detail', async ({ page }) => {
      await page.goto('/home');

      await page
        .locator('nav.navbar')
        .getByRole('link', { name: remote.nav, exact: true })
        .click();

      await expect(page).toHaveURL(new RegExp(`/${remote.path}$`));
      await expect(
        page.getByRole('heading', { name: remote.listHeading })
      ).toBeVisible();

      const listLinks = page.locator('ul li a');
      await expect(listLinks).toHaveCount(2);
      await expect(listLinks.first()).toBeVisible();

      await listLinks.first().click();

      await expect(page).toHaveURL(new RegExp(`/${remote.path}/1$`));
      await expect(
        page.getByRole('heading', { name: remote.detailHeading })
      ).toBeVisible();
      await expect(page.getByText(remote.detailText('1'))).toBeVisible();
    });
  });
}

test('direct load of /customers/2 renders detail with ID 2', async ({
  page,
}) => {
  await page.goto('/customers/2');

  await expect(page).toHaveURL(/\/customers\/2$/);
  await expect(
    page.getByRole('heading', { name: 'Customer Detail' })
  ).toBeVisible();
  await expect(page.getByText('Viewing customer ID: 2')).toBeVisible();
});
