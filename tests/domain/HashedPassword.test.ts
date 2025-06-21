import bcrypt from 'bcryptjs';
import { HashedPassword } from '../../src/domain/entities/value-objects';
import { Password } from '../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../src/infrastructure/cryptography/BcryptHasher';

describe('Testing Phone validator', () => {
  test('Should create a hash password', async () => {
    const password = Password.create('Test123*@!55').getRight();
    const hasher = new BcryptHasher(12);
    const hashedPasswordOrError = await HashedPassword.create(password, hasher);

    expect(hashedPasswordOrError.isRight()).toBeTruthy();
    expect(
      bcrypt.compare(password.get(), hashedPasswordOrError.getRight().get())
    ).toBeTruthy();
  });

  test('Should compare a raw password and a hashed one properly', async () => {
    const password = Password.create('Test123*@!55').getRight();
    const comparer = new BcryptHasher();
    const hashedPassword = await bcrypt.hash(password.get(), 12);

    expect(comparer.compare(password.get(), hashedPassword)).toBeTruthy();
  });
});
