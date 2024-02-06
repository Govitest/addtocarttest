import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html']],
  timeout: 120000,
  use: {
    headless: false,
    trace: "off",
    
  },
  globalSetup: "src/helper/env/globalsetup.ts",
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        viewport: { width: 1905, height: 945 }
      },
    }
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1280, height: 601 }
    //   },
    // },
    // // Add a project for Chrome
    // {
    //   name: 'chrome',
    //   use: {
    //     browserName: 'webkit', // WebKit is the engine for Chrome in Playwright
    //     ...devices['Desktop Chrome'],
    //     viewport: { width: 1280, height: 601 }
    //   },
    // },
  ],
});
