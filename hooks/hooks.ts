import 'dotenv/config';
import '../fixtures/world';

import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';
import { DataFactory } from '../utils/dataFactory';
import { ApiClient } from '../utils/apiClient';

Before(async function (this: CustomWorld) {
  await this.init();
});

Before({ tags: '@auth' }, async function (this: CustomWorld) {

  const user = DataFactory.randomUser();

  const createResponse = await ApiClient.createUser(
    user.username,
    user.password
  );

  const body = await createResponse.json();

  console.log('CREATE USER STATUS:', createResponse.status());
  console.log('CREATE USER BODY:', body);

  if (createResponse.status() !== 201) {
    throw new Error(`Error creando usuario: ${JSON.stringify(body)}`);
  }

  const tokenResponse = await ApiClient.generateToken(
    user.username,
    user.password
  );

  const tokenData = await tokenResponse.json();

  this.user = {
    ...user,
    token: tokenData.token
  };

  await new Promise(res => setTimeout(res, 1000));
});

After(async function (this: CustomWorld) {
  await this.close();
});