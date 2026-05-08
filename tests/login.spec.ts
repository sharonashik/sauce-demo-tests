import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees an error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText(/locked out/i);
  });

  test('wrong password shows an error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText(/Username and password do not match/i);
  });

  test('empty username shows an error', async ({ page }) => {
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText(/Username is required/i);
  });
});