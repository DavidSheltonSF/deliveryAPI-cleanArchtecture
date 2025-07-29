import { Password } from '../';
import {BcryptHasher} from '../../../infrastructure/services/BcryptHasher'


describe('Testing Phone validator', () => {
  test('should create a Password VO', async () => {
    const validPassword = 'Test123*@!55';
    const hasher = new BcryptHasher(12);
    const passwordOrError = await Password.create(validPassword, hasher);

    expect(passwordOrError.isRight()).toBeTruthy();

  });

  test('should crate a PasswordVO with the password provided', async () => {
    const validPassword = 'Test123*@!55';
    const hasher = new BcryptHasher(12);
    const password = (await Password.create(validPassword, hasher)).getRight();

    expect(password.compare(validPassword, hasher)).toBeTruthy();
  });
});
