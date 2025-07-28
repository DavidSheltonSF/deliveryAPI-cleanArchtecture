import { Authentication } from './Authentication';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { AuthenticationProps } from './props/AuthenticationProps';
import { MongodbIdAdapter } from '../../infrastructure/adapters/MongodbIdAdapter';

describe('Testing Authentication entity', () => {
  const idAdapter = new MongodbIdAdapter();
  const hasher = new BcryptHasher(12);

  const globalAuthProps: AuthenticationProps = {
    userId: 'fakeUserId421451',
    passwordHash: 'D#434155fadfss',
    sessionToken: 'fakeSessionToken',
  };

  test('should create a valid Authentication entity', () => {
    const authentication = new Authentication(globalAuthProps, hasher);
    const authId = idAdapter.generate();
    const setIdResult = authentication.setId(authId);

    expect(setIdResult.isRight()).toBeTruthy();
    expect(authentication.id).toBe(authId);
    expect(authentication.userId).toBe(globalAuthProps.userId);
    expect(authentication.passwordHash).toBe(globalAuthProps.passwordHash);
    expect(authentication.sessionToken).toBe(globalAuthProps.sessionToken);
    expect(authentication.createdAt).toBeTruthy();
  });

  test('should throw an error when trying to modify immutable properties after they are set', () => {
    const authentication = new Authentication(globalAuthProps, hasher);
    const authenticationId = 'fdkafnsdnnafkdjiIdtesst-test';

    authentication.setId(authenticationId);

    const setIdResult = authentication.setId('id-afdsnakfnasdkf');

    expect(setIdResult.isLeft()).toBeTruthy();
  });

  test('should compare a raw password and a password hash properly', async () => {
    const { ...authProps } = globalAuthProps;
    const password = authProps.passwordHash;
    authProps.passwordHash = await hasher.hash(authProps.passwordHash);

    const wrongPassword = 'fakeUsIdsadCS451';

    const authentication = new Authentication(authProps, hasher);

    const passwordComparizon1 = await authentication.compare(password);
    const passwordComparizon2 = await authentication.compare(wrongPassword);
    expect(passwordComparizon1).toBeTruthy();
    expect(passwordComparizon2).toBeFalsy();
  });

  test('should start a session properly properly', () => {
    const authentication = new Authentication(globalAuthProps, hasher);
    const sessionToken = 'userSessionToken';
    authentication.startSession(sessionToken);

    expect(authentication.sessionToken).toBe(sessionToken);
  });

  test('should end a session properly properly', () => {
    const authentication = new Authentication(globalAuthProps, hasher);
    authentication.endSession();

    expect(authentication.sessionToken).toBeFalsy();
  });
});
