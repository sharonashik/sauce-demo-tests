import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Setup project: logs in once and saves auth state to a file
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // Tests that need to start logged OUT (login flow tests)
    {
      name: 'logged-out',
      testMatch: ['**/login.spec.ts', '**/visual.spec.ts'],
      use: { ...devices['Desktop Chrome'] },
    },
    // Tests that need to start logged IN (reuses saved state)
    {
      name: 'logged-in',
      testMatch: '**/inventory.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});