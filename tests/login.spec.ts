import { test, expect } from '../fixtures/test-fixtures';
import { invalidLoginCases, validUsers } from '../fixtures/login-test-data';

test.describe('Login - invalid credentials', () => {
  for (const testCase of invalidLoginCases) {
    test(`shows error for ${testCase.name}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(testCase.username, testCase.password);
      await expect(loginPage.errorMessage).toContainText(testCase.expectedError);
    });
  }
});

test.describe('Login - valid credentials', () => {
  for (const user of validUsers) {
    test(`${user.username} can log in`, async ({ loginPage, inventoryPage }) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      await inventoryPage.expectLoaded();
    });
  }
});