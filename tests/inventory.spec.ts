import { test, expect } from '../fixtures/test-fixtures';

test.describe('Inventory (authenticated)', () => {
  test('inventory page loads when already authenticated', async ({ inventoryPage }) => {
    // Notice: NO login steps! Auth state is restored from storageState.
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
  });

  test('cart link is visible on inventory page', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await expect(inventoryPage.cartLink).toBeVisible();
  });
});