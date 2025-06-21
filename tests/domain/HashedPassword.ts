import { Password } from '../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../src/infrastructure/cryptography/BcryptHasher';
import bcrypt from 'bcryptjs';

describe('Testing Phone validator', () => {
  test('Trying to create a valid password', async () => {
    const hasher = new BcryptHasher(12);
    const validPassword = 'Test123*@!55';
    const passwordOrError = Password.create(validPassword);

    expect(passwordOrError.isRight()).toBeTruthy();
    expect(
      bcrypt.compare(validPassword, passwordOrError.getRight().get())
    ).toBeTruthy();
  });
});
