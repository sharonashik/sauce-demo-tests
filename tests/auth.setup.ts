import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate as standard user', async ({ page }) => {
  // Perform a real login through the UI
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login actually worked before saving state
  await expect(page).toHaveURL(/.*inventory.html/);

  // Save the authenticated browser state (cookies, localStorage) to a JSON file
  await page.context().storageState({ path: authFile });
});