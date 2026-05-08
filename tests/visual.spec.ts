import { test, expect } from '../fixtures/test-fixtures';

test.describe('Visual regression - login page', () => {
  test('login page matches baseline', async ({ loginPage, page }) => {
    await loginPage.goto();
    // Wait for page to be visually stable before screenshot
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('login error state matches baseline', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveScreenshot('login-error-state.png');
  });

  test('login button matches baseline', async ({ loginPage }) => {
    await loginPage.goto();
    // Element-level screenshot — only the button itself
    await expect(loginPage.loginButton).toHaveScreenshot('login-button.png');
  });
});