import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: any) {
    super(page);

    this.usernameInput = this.page.locator('#userName');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#login');
    this.errorMessage = this.page.locator('#name');
  }

  async goTo() {
    await this.navigate('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

async expectLoginSuccess(username: string) {
  const userLabel = this.page.locator('#userName-value');

  await expect(userLabel).toBeVisible();

  await expect(userLabel).toHaveText(username);
}

async expectLoginError() {
  await expect(this.errorMessage).toBeVisible();
  await expect(this.errorMessage).toContainText('Invalid');
}

  async getErrorText(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}