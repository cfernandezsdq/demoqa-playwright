import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BooksPage extends BasePage {
  readonly searchBox: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);

    this.searchBox = page.locator('#searchBox');

    this.tableRows = page.locator('tbody tr');
  }

  async goTo() {
    await this.navigate('/books');
    await expect(this.searchBox).toBeVisible();
  }

  async searchBook(keyword: string) {
    await this.searchBox.fill(keyword);


    await this.page.waitForFunction(
      () => {
        const rows = document.querySelectorAll('tbody tr');
        return rows.length >= 0;
      }
    );
  }

async expectResults(keyword: string) {

  const count = await this.tableRows.count();

  if (count === 0) {
    throw new Error('Se esperaban resultados pero no hay filas');
  }


  await expect(this.tableRows).toContainText(keyword);
}

  async expectNoResults() {

    await expect(this.tableRows).toHaveCount(0);
  }
}