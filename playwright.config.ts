import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import { platform } from 'os';
import { getEnvironmentData, setEnvironmentData } from 'worker_threads';
import * as os from "node:os";
import { EventEmitterAsyncResource } from 'stream';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI
    ? "line"
    : [
      ["html", { open: "never", outputFolder: "my-report" }],
      ["list", { outputFolder: "./test-results" }],
      ["allure-playwright"],
    ],

  use: {
    trace: "on-first-retry",
    video: 'on',
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    browserName: "chromium", //firefox, webkit,chromium
    channel: "chrome", //msedge,chrome
    headless: false,
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 300,
    },
    viewport: { width: 1600, height: 860 },
  },

  //projects: [
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  //   {
  //     name: 'Mobile Safari',
  //     use: { ...devices['iPhone 15 Pro Max landscape'],ignoreHTTPSErrors: true,viewport: {width:1600, height:860}, },
  //   },
  // ],
  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
