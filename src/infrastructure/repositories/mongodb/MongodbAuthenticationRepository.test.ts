import { mongoHelper } from './helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbAuthenticationRepository } from './MongodbAuthenticationRepository';
import { Authentication } from '../../../domain/entities/Authentication';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { ObjectId } from 'mongodb';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { entityCollectionMap } from './helpers/entityCollectionMap';
import { Password } from '../../../domain/value-objects';

config();

describe('Testing MongodbAuthenticationRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI) {
      await mongoHelper.connect(MONGO_URI);
    } else {
      console.log('NO URI');
    }
  }, 60000);

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.clearCollection(entityCollectionMap.authentication);
  });

  async function makeSut() {
    const repository = new MongodbAuthenticationRepository();
    const hasher = makeMockHasher();
    const authenticationCollection = mongoHelper.getCollection(
      entityCollectionMap.authentication
    );
    const authenticationData = {
      password: 'Djresar25322@@%@as',
      sessionToken: 'kfndsikfnsdif',
    };
    const authenticationPropsOrError = await AuthenticationMapper.rawToProps(
      authenticationData,
      hasher
    );
    const authenticationProps = authenticationPropsOrError.getRight();
    authenticationProps.userId = new ObjectId().toString();
    const authentication = Authentication.create(authenticationProps, hasher);

    return {
      repository,
      hasher,
      authentication,
      authenticationData,
      authenticationCollection,
    };
  }

  test('should create a new Authentication in the database', async () => {
    const { repository, authentication, authenticationCollection } =
      await makeSut();
    const newAuthentication = await repository.create(authentication);
    //console.log(newAuthentication)
    if (newAuthentication === null) {
      throw Error('Authentication not created');
    }
    const id = newAuthentication.id;
    const foundAuthentication = await authenticationCollection.findOne({
      _id: stringToObjectId(id),
    });

    if (foundAuthentication === null) {
      throw Error('Authentication not found');
    }

    expect(newAuthentication.userId).toBe(foundAuthentication.userId);
    expect(
      newAuthentication.compare(foundAuthentication.password)
    ).toBeTruthy();
    expect(newAuthentication.sessionToken).toBe(
      foundAuthentication.sessionToken
    );
  });

  test('should update an existing Authentication', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authenticationData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      createdAt: new Date(),
    };

    const newAuthenticationId = (
      await authenticationCollection.insertOne(authenticationData)
    ).insertedId;

    const foundAuthentication = await authenticationCollection.findOne({
      _id: newAuthenticationId,
    });

    if (foundAuthentication === null) {
      throw Error('Authentication not found');
    }

    const authentication = Authentication.createFromPersistence(
      {
        _id: foundAuthentication._id.toString(),
        userId: foundAuthentication.userId.toString(),
        passwordHash: foundAuthentication.passwordHash,
        sessionToken: foundAuthentication.sessionToken,
        createdAt: foundAuthentication.createdAt,
      },
      hasher
    );

    const passwordOrError = await Password.create(password, hasher);
    const passwordHash = passwordOrError.getRight();

    authentication.updatePasswordHash(passwordHash);
    await repository.update(authentication);

    const updatedAuthentication = await authenticationCollection.findOne({
      _id: stringToObjectId(authentication.id),
    });

    expect(updatedAuthentication?._id.toString()).toBe(authentication.id);
    expect(updatedAuthentication?.passwordHash).toBe(passwordHash.getValue());
  });

  test('should delete an existing Authentication', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authenticationData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      createdAt: new Date(),
    };

    const newAuthenticationId = (
      await authenticationCollection.insertOne(authenticationData)
    ).insertedId;

    const foundAuthentication = await authenticationCollection.findOne({
      _id: newAuthenticationId,
    });

    if (foundAuthentication === null) {
      throw Error('Authentication not found');
    }

    const deletedAuthentication = await repository.delete(
      newAuthenticationId.toString()
    );

    const findDeletedAuthentication = await authenticationCollection.findOne({
      _id: newAuthenticationId,
    });

    expect(deletedAuthentication).toBeTruthy();
    expect(findDeletedAuthentication).toBeFalsy();
  });

  test('should find an authentication by id', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authenticationData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      createdAt: new Date(),
    };

    const authId = (
      await authenticationCollection.insertOne(authenticationData)
    ).insertedId;

    const authentication = await repository.findById(authId.toString(), hasher);

    expect(authentication?.id).toBe(authId.toString());
    expect(authentication?.compare(password));
  });

  test('should find an authentication by user id', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authenticationData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      createdAt: new Date(),
    };

    const authId = (
      await authenticationCollection.insertOne(authenticationData)
    ).insertedId;

    const userId = authenticationData.userId.toString();
    const authentication = await repository.findByUserId(userId, hasher);

    expect(authentication?.id).toBe(authId.toString());
    expect(authentication?.compare(password));
  });
});
