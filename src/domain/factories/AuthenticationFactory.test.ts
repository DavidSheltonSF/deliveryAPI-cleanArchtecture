import { AuthenticationFactory } from './AuthenticationFactory';
import { BcryptHasher } from '../../infrastructure/cryptography/BcryptHasher';

describe('Testing UserName validator', () => {
  const authentication = {
    password: 'Ddfsed44%%@fa',
  };

  test('Should create an Address domain entity properly', async () => {
    const hasher = new BcryptHasher(12);

    const authEmail = 'teste@email.com';

    const authenticationEntity = (
      await AuthenticationFactory.create(authentication, authEmail, hasher)
    ).getRight();

    expect(authenticationEntity.email).toBe(authEmail);
    expect(
      hasher.compare(authentication.password, authenticationEntity.passwordHash)
    ).toBeTruthy();
  });
});
