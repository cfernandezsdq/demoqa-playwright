import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('el usuario navega a la página de login', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goTo();
});

When('ingresa credenciales válidas', async function (this: CustomWorld) {
  if (!this.user) {
    throw new Error('Usuario no disponible');
  }

  await loginPage.login(this.user.username, this.user.password);
});

When('ingresa credenciales incorrectas', async function () {
  await loginPage.login('wrongUser', 'wrongPass');
});

Then('debe acceder al perfil', async function (this: CustomWorld) {
  if (!this.user) {
    throw new Error('Usuario no disponible');
  }

  await loginPage.expectLoginSuccess(this.user.username);
});

Then('debe ver un mensaje de error', async function () {
  await loginPage.expectLoginError();
});