import { AuthenticationFactory } from './AuthenticationFactory';
import { BcryptHasher } from '../../infrastructure/cryptography/BcryptHasher';

describe('Testing UserName validator', () => {
  const authentication = {
    password: 'Ddfsed44%%@fa',
  };

  test('Should create an Address domain entity properly', () => {
    const hasher = new BcryptHasher();

    const authEmail = 'teste@email.com';

    const authenticationEntity = AuthenticationFactory.create(
      authentication,
      authEmail
    ).getRight();

    expect(authenticationEntity.email).toBe(authEmail);
    expect(
      hasher.compare(authentication.password, authenticationEntity.passwordHash)
    ).toBeTruthy();
  });
});
