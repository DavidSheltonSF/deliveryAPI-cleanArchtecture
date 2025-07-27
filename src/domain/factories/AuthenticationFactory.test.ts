import { AuthenticationFactory } from './AuthenticationFactory';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';

describe('Testing UserName validator', async () => {
  test('Should create an Factory', async () => {
    const hasher = new BcryptHasher(12);
    const password = 'fjasmfkdmfkamfake';
    const passwordHash = await hasher.hash(password);
    const authenticationProps = {
      id: 'fdafdfafd',
      userId: 'fdsfafksdafa',
      passwordHash: passwordHash,
      sessionToken: 'fadfadsfa',
    };

    const authentication = AuthenticationFactory.create(authenticationProps);

    expect(authentication.userId).toBe(authenticationProps.userId);
    expect(authentication.sessionToken).toBe(authenticationProps.sessionToken);
    expect(await authentication.compare(password, hasher)).toBeTruthy();
  });
});
