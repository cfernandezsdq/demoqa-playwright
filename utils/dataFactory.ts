export class DataFactory {
  static randomUser() {
    const id = Math.floor(Math.random() * 100000);

    return {
      username: `user_${id}`,
      password: `Test${id}!Aa`,
    };
  }
}
