import { Authentication } from './Authentication';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';

describe('Testing Authentication entity', () => {
  const hasher = new BcryptHasher(12);

  test('Should create a valid Authentication entity', () => {
    const authData = {
      userId: 'fakeUserId421451',
      passwordHash: 'D#434155fadfss',
      sessionToken: 'fakeSessionToken',
    };

    const authentication = new Authentication(authData, hasher);
    expect(authentication.userId).toBe(authData.userId);
    expect(authentication.passwordHash).toBe(authData.passwordHash);
    expect(authentication.sessionToken).toBe(authData.sessionToken);
  });

  test('Should compare a raw password and a password hash properly', async () => {
    const password1 = 'fakeUserId421451';
    const passwordHash1 = await hasher.hash(password1);
    const authProps1 = {
      id: 'dsfsdaflsmdgsd',
      userId: 'dfafddaf',
      passwordHash: passwordHash1,
      sessionToken: 'fakeSessionToken',
    };

    const password2 = 'fakeUsIdsadCS451';

    const authentication = new Authentication(authProps1, hasher);

    const passwordComparizon1 = await authentication.compare(password1);
    const passwordComparizon2 = await authentication.compare(password2);
    expect(passwordComparizon1).toBeTruthy();
    expect(passwordComparizon2).toBeFalsy();
  });

  test('Should start a session properly properly', () => {
    const authProps = {
      userId: 'fakeUserId4215544',
      passwordHash: 'fakeHashedPassword',
      sessionToken: 'fakeSessionToken11',
    };

    const authentication = new Authentication(authProps, hasher);

    const sessionToken = 'userSessionToken';
    authentication.startSession(sessionToken);

    expect(authentication.sessionToken).toBe(sessionToken);
  });

  test('Should end a session properly properly', () => {
    const authProps = {
      userId: 'fakeUserId4215544',
      passwordHash: 'fakeHashedPassword',
      sessionToken: 'fakeSessionToken11',
    };

    const authentication = new Authentication(authProps, hasher);

    authentication.endSession();

    expect(authentication.sessionToken).toBeFalsy();
  });
});
