import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: '../test-results',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: '../playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ||
      process.env.BASE_URL ||
      'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run start:shell',
      url: 'http://localhost:4200',
      cwd: '..',
      reuseExistingServer: !CI,
      timeout: 180_000,
    },
    {
      command: 'npm run start:identity',
      url: 'http://localhost:4201/remoteEntry.js',
      cwd: '..',
      reuseExistingServer: !CI,
      timeout: 180_000,
    },
    {
      command: 'npm run start:customer',
      url: 'http://localhost:4202/remoteEntry.js',
      cwd: '..',
      reuseExistingServer: !CI,
      timeout: 180_000,
    },
    {
      command: 'npm run start:order',
      url: 'http://localhost:4203/remoteEntry.js',
      cwd: '..',
      reuseExistingServer: !CI,
      timeout: 180_000,
    },
    {
      command: 'npm run start:product',
      url: 'http://localhost:4204/remoteEntry.js',
      cwd: '..',
      reuseExistingServer: !CI,
      timeout: 180_000,
    },
  ],
});
