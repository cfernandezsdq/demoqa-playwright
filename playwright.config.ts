import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: true,
  reporter: "html",
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    screenshot: "only-on-failure",
    video: "on",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "ui",
      testDir: "./tests/ui",
      retries: 2,
      use: { browserName: "chromium" },
    },
  ],
});