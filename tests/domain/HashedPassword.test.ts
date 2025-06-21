import bcrypt from 'bcryptjs';
import { HashedPassword } from '../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../src/infrastructure/cryptography/BcryptHasher';

describe('Testing Phone validator', () => {
  test('Should create a hash password', async () => {
    const validPassword = 'Test123*@!55';
    const hasher = new BcryptHasher(12);
    const hashedPasswordOrError = await HashedPassword.create(
      validPassword,
      hasher
    );

    expect(hashedPasswordOrError.isRight()).toBeTruthy();
    expect(
      bcrypt.compare(validPassword, hashedPasswordOrError.getRight().get())
    ).toBeTruthy();
  });

  test('Should compare a raw password and a hashed one properly', async () => {
    const validPassword = 'Test123*@!55';
    const comparer = new BcryptHasher();
    const hashedPassword = await bcrypt.hash(validPassword, 12);

    expect(comparer.compare(validPassword, hashedPassword)).toBeTruthy();
  });
});
