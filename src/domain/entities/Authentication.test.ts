import { Authentication } from './Authentication';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';

describe('Testing Authentication entity', () => {
  const hasher = new BcryptHasher(12);

  test('Should create a valid Authentication entity', () => {
    const authData = {
      id: 'authIdf1341',
      userId: 'fakeUserId421451',
      password: 'D#434155fadfss',
      sessionToken: 'fakeSessionToken',
      createdAt: new Date('2000-01-01'),
    };

    const authentication = new Authentication(
      authData.userId,
      authData.password,
      authData.sessionToken,
      authData.createdAt,
      authData.id
    );
    expect(authentication.userId).toBe(authData.userId);
    expect(authentication.passwordHash).toBe(authData.password);
    expect(authentication.sessionToken).toBe(authData.sessionToken);
    expect(authentication.createdAt?.getTime()).toBe(
      authData.createdAt.getTime()
    );
    expect(authentication.id).toBe(authData.id);
  });

  test('Should compare a raw password and a password hash properly', async () => {
    const auth1 = {
      userId: 'fakeUserId421451',
      password: 'D#434155fadfss',
      sessionToken: 'fakeSessionToken',
    };

    const auth2 = {
      userId: 'fakeUserId4215544',
      password: 'V#4KAI43JINKNisnida',
      sessionToken: 'fakeSessionToken11',
    };

    const passwordHash = await hasher.hash(auth1.password);
    const authentication = new Authentication(
      auth1.userId,
      passwordHash,
      auth1.sessionToken
    );

    const passwordComparizon1 = await authentication.compare(
      auth1.password,
      hasher
    );
    const passwordComparizon2 = await authentication.compare(
      auth2.password,
      hasher
    );
    expect(passwordComparizon1).toBeTruthy();
    expect(passwordComparizon2).toBeFalsy();
  });

  test('Should start a session properly properly', () => {
    const authData = {
      userId: 'fakeUserId421451',
      password: 'D#434155fadfss',
    };

    const authentication = new Authentication(
      authData.userId,
      authData.password
    );

    const sessionToken = 'userSessionToken';
    authentication.startSession(sessionToken);

    expect(authentication.sessionToken).toBe(sessionToken);
  });

  test('Should end a session properly properly', () => {
    const authData = {
      userId: 'fakeUserId421451',
      password: 'D#434155fadfss',
      sessionToken: 'userSessionToken',
    };

    const authentication = new Authentication(
      authData.userId,
      authData.password
    );

    authentication.endSession();

    expect(authentication.sessionToken).toBeFalsy();
  });
});
