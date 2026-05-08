import { test, expect } from '../fixtures/test-fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText(/locked out/i);
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText(/Username and password do not match/i);
  });

  test('empty username shows an error', async ({ page, loginPage }) => {
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText(/Username is required/i);
  });
});