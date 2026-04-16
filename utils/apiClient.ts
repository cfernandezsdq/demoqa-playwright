import 'dotenv/config';
import { request } from '@playwright/test';

export class ApiClient {

  private static baseUrl = process.env.BASE_URL;

  private static getContext() {
    if (!this.baseUrl) {
      throw new Error('BASE_URL no está definido en .env');
    }

    return request.newContext({
      baseURL: this.baseUrl
    });
  }

  static async createUser(username: string, password: string) {
    const context = await this.getContext();

    return await context.post('/Account/v1/User', {
      data: {
        userName: username,
        password: password
      }
    });
  }

  static async generateToken(username: string, password: string) {
    const context = await this.getContext();

    return await context.post('/Account/v1/GenerateToken', {
      data: {
        userName: username,
        password: password
      }
    });
  }
}