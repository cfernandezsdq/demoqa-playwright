import 'dotenv/config';

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  user?: {
    username: string;
    password: string;
    token?: string;
  };

  lastKeyword?: string;

  async init() {
    console.log(process.env.BASE_URL); 

    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true'
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);