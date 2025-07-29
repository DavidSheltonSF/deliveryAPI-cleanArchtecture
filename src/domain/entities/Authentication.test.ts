import { Authentication } from './Authentication';
import { BcryptHasher } from '../../infrastructure/services/BcryptHasher';
import { RawAuthenticationProps } from './rawProps/RawAuthenticationProps';
import { MongodbIdAdapter } from '../../infrastructure/adapters/MongodbIdAdapter';

describe('Testing Authentication entity', () => {
  const idAdapter = new MongodbIdAdapter();
  const hasher = new BcryptHasher(12);

  const globalAuthProps: RawAuthenticationProps = {
    password: 'D#434155fadfss',
    sessionToken: 'fakeSessionToken',
  };

  async function makeValidAuth(
    props: RawAuthenticationProps
  ): Promise<Authentication> {
    const authOrError = await Authentication.create(props, hasher);
    return authOrError.getRight();
  }

  test('should return either right value if the data provided is valid', async () => {
    const authOrError = await Authentication.create(globalAuthProps, hasher);
    expect(authOrError.isRight()).toBeTruthy();
  });

  test('should create a valid Authentication entity', async () => {
    const authOrError = await Authentication.create(globalAuthProps, hasher);
    const auth = authOrError.getRight();
    
    expect(auth.compare(globalAuthProps.password)).toBeTruthy();
    expect(auth.sessionToken).toBe(globalAuthProps.sessionToken);
    expect(auth.createdAt).toBeTruthy();
  });

  test('should compare a raw password and a password hash properly', async () => {
    const props = {
      userId: 'fakeUserId421451',
      password: 'D#434155fadfss',
      sessionToken: 'fakeSessionToken',
    };

    const auth = await makeValidAuth(props);

    expect(await auth.compare(props.password)).toBeTruthy();
    expect(await auth.compare('WrongPassword')).toBeFalsy();
  });

  test('should start a session properly properly', async () => {
    const auth = await makeValidAuth(globalAuthProps);
    const sessionToken = 'userSessionToken';
    auth.startSession(sessionToken);

    expect(auth.sessionToken).toBe(sessionToken);
  });

  test('should end a session properly properly', async () => {
    const auth = await makeValidAuth(globalAuthProps)
    auth.endSession();

    expect(auth.sessionToken).toBeFalsy();
  });

  test('should create Authentication from a persistence model', async() => {

    const passwordHash = await hasher.hash('D#4435492ddd3');
    const authModel = {
      _id: idAdapter.generate(),
      userId: idAdapter.generate(),
      passwordHash,
      sessionToken: 'fakeTokenkganskfa',
      createdAt: new Date()
    }

    const auth = Authentication.createFromPersistence(authModel, hasher)

    expect(auth.id).toBe(authModel._id.toString());
    expect(auth.userId).toBe(authModel.userId.toString());
    expect(auth.passwordHash).toBe(authModel.passwordHash);
    expect(auth.sessionToken).toBe(authModel.sessionToken);
  });
});
