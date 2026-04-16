import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';
import { BooksPage } from '../pages/BooksPage';

let booksPage: BooksPage;

Given('el usuario está en la página de libros', async function (this: CustomWorld) {
  booksPage = new BooksPage(this.page);
  await booksPage.goTo();
});

When('busca {string}', async function (this: CustomWorld, keyword: string) {
  this.lastKeyword = keyword;
  await booksPage.searchBook(keyword);
});

Then('el resultado debe ser {string}', async function (this: CustomWorld, tieneResultados: string) {

  if (!this.lastKeyword) {
    throw new Error('Keyword no definida');
  }

  const expected = tieneResultados === 'true';

  if (expected) {
    await booksPage.expectResults(this.lastKeyword);
  } else {
    await booksPage.expectNoResults();
  }
});