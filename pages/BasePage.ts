import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || '';
  }

  async navigate(path: string) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }
}