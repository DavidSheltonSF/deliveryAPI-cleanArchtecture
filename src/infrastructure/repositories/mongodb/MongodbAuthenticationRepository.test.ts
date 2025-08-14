import { mongoHelper } from './helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbAuthenticationRepository } from './MongodbAuthenticationRepository';
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
    const authData = {
      password: 'Djresar25322@@%@as',
      sessionToken: 'kfndsikfnsdif',
    };
    const authenticationPropsOrError = await AuthenticationMapper.rawToProps(
      authData,
      hasher
    );
    const authenticationProps = authenticationPropsOrError.getRight();
    authenticationProps.userId = new ObjectId().toString();

    return {
      repository,
      hasher,
      authenticationProps,
      authData,
      authenticationCollection,
    };
  }

  test('should create a new Authentication in the database', async () => {
    const { repository, authenticationProps, authenticationCollection } =
      await makeSut();
    const newAuthentication = await repository.create(authenticationProps);
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
    expect(newAuthentication.passwordHash.getValue()).toBe(foundAuthentication.passwordHash)
    expect(newAuthentication.sessionToken).toBe(
      foundAuthentication.sessionToken
    );
  });


  test('should update an existing Authentication', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      createdAt: new Date(),
    };

    const authObjId = (
      await authenticationCollection.insertOne(authData)
    ).insertedId;

    const createdAuth = await authenticationCollection.findOne({
      _id: authObjId,
    });

    if (createdAuth === null) {
      throw Error('Authentication was not createdd');
    }

    const newPassword = 'new45332psPass4$$!1'
    const passwordOrError = await Password.create(newPassword, hasher);
    const newPasswordHash = passwordOrError.getRight();

    const updatedAuth = {
      ...authData,
      userId: authData.userId.toString(),
      passwordHash: newPasswordHash,
    };

    const authId = authObjId.toString();

    await repository.update(authId, updatedAuth);

    const foundUpdatedAuth = await authenticationCollection.findOne({
      _id: stringToObjectId(authId),
    });

    expect(foundUpdatedAuth?._id.toString()).toBe(authId);
    expect(foundUpdatedAuth?.passwordHash).toBe(newPasswordHash.getValue());
  });


  test('should delete an existing Authentication', async () => {
    const { authenticationCollection, repository } = await makeSut();

    const authData = {
      userId: new ObjectId(),
      passwordHash: 'fakePaksdnfjajbqjwq',
      createdAt: new Date(),
    };

    const authId = (
      await authenticationCollection.insertOne(authData)
    ).insertedId;

    const authCreated = await authenticationCollection.findOne({
      _id: authId,
    });

    if (authCreated === null) {
      throw Error('Authentication was not created');
    }

    const deletedAuthentication = await repository.delete(authId.toString());

    const findDeletedAuthentication = await authenticationCollection.findOne({
      _id: authId,
    });

    expect(deletedAuthentication).toBeTruthy();
    expect(findDeletedAuthentication).toBeFalsy();
  });

  test('should find an authentication by id', async () => {
    const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      sessionToken: 'dksnfkasdnfiasdfa',
      createdAt: new Date(),
    };

    const authId = (
      await authenticationCollection.insertOne(authData)
    ).insertedId;

    const authentication = await repository.findById(authId.toString());

    expect(authentication?.id).toBe(authId.toString());
    expect(authentication?.userId).toBe(authData.userId.toString());
    expect(authentication?.sessionToken).toBe(authData.sessionToken);
    expect(hasher.compare(password, authData.passwordHash));
  });


  test('should find an authentication by user id', async () => {
   const { authenticationCollection, repository, hasher } = await makeSut();

    const password = 'dDe#3251KJINFA55';
    const authData = {
      userId: new ObjectId(),
      passwordHash: await hasher.hash(password),
      sessionToken: 'dksnfkasdnfiasdfa',
      createdAt: new Date(),
    };

    const authId = (
      await authenticationCollection.insertOne(authData)
    ).insertedId;

    const userId = authData.userId.toString();
    const authentication = await repository.findByUserId(userId);

    expect(authentication?.id).toBe(authId.toString());
    expect(authentication?.userId).toBe(authData.userId.toString());
    expect(authentication?.sessionToken).toBe(authData.sessionToken);
    expect(hasher.compare(password, authData.passwordHash));
  });
});
