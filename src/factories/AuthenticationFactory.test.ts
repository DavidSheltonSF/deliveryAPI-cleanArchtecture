import { AuthenticationFactory } from './AuthenticationFactory';
import { AuthenticationMocker } from '../tests/mocks/AuthenticationMocker';
import { makeMockHasher } from '../tests/mocks/mockHasher';

describe('Testing AuthenticationFactory', () => {
  function makeSut() {
    const hasher = makeMockHasher();
    const authenticationData = AuthenticationMocker.mockAuthenticationDTO();

    return {
      hasher,
      authenticationData,
    };
  }

  test('should return right if all values are valid', async () => {
    const { authenticationData, hasher } = makeSut();
    const authenticationOrError = await AuthenticationFactory.create(
      authenticationData,
      hasher
    );
    expect(authenticationOrError.isRight());
  });

  test('should create an authentication with all data provided', async () => {
    const { authenticationData, hasher } = makeSut();
    const authenticationOrError = await AuthenticationFactory.create(
      authenticationData,
      hasher
    );

    const authentication = authenticationOrError.getRight();
    const authPasswordHash = authentication.passwordHash.getValue();
    expect(
      hasher.compare(authPasswordHash, authenticationData.password)
    ).toBeTruthy();
    expect(authentication.sessionToken).toBe(authenticationData.sessionToken);
  });

  test('should return error if password is nos provided', async () => {
    const { authenticationData, hasher } = makeSut();
    authenticationData.password = '';
    const authenticationOrError = await AuthenticationFactory.create(
      authenticationData,
      hasher
    );

    expect(authenticationOrError.isLeft());
  });

  test('should create an authentication from persistence with all data provided', async () => {
    const authenticationData = {
      id: 'sdifnasfinadf',
      userId: 'fsafdaff',
      passwordHash: 'dsafdsafaifaifbafafffff',
      sessionToken: 'fmsdafninfaffd',
      createdAt: new Date(),
      birthday: new Date(),
    };
    const authentication =
      AuthenticationFactory.createFromPersistence(authenticationData);

    expect(authentication.passwordHash.getValue()).toBe(authenticationData.passwordHash);
    expect(authentication.sessionToken).toBe(authenticationData.sessionToken);
  });
});
