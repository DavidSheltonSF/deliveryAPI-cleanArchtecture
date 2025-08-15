import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
} from '../../../domain/value-objects';
import { UserModel } from '../../models/mongodb/UserModel';
import { ObjectId } from 'mongodb';
import { Role } from '../../../domain/_enums';
import { stringToObjectId } from './helpers/stringToObjectId';
import { UserProps } from '../../../domain/entities/props/UserProps';
import { entityCollectionMap } from './helpers/entityCollectionMap';
import { UserFactory } from '../../../factories/UserFactory';

config();

const repository = new MongodbCustomerRepository();

describe('Testing MongodbCustomerRepository', () => {
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
    await mongoHelper.clearCollection(entityCollectionMap.user);
  });

  async function makeSut() {
    const repository = new MongodbCustomerRepository();
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const userData = UserMocker.mockUserDTO();
    const userPropsOrError = UserFactory.create(userData);
    const userProps = userPropsOrError.getRight();

    return {
      repository,
      userData,
      userProps,
      userCollection,
    };
  }

  test('should create a new customer in the database', async () => {
    const { repository, userProps, userCollection } = await makeSut();

    const newCustomer = await repository.create(userProps);

    if (newCustomer === null) {
      throw Error('User not created');
    }

    const id = newCustomer.id;

    const foundCustomer = await userCollection.findOne({
      _id: stringToObjectId(id),
    });
    expect(newCustomer.firstName.getValue()).toBe(foundCustomer?.firstName);
    expect(newCustomer.lastName.getValue()).toBe(foundCustomer?.lastName);
    expect(newCustomer.email.getValue()).toBe(foundCustomer?.email);
    expect(newCustomer.cpf.getValue()).toBe(foundCustomer?.cpf);
    expect(newCustomer.phone.getValue()).toBe(foundCustomer?.phone);
    expect(newCustomer.role).toBe(foundCustomer?.role);
  });

  test('should update an existing customer', async () => {
    const { userCollection, userData } = await makeSut();

    const userModel: UserModel = {
      ...userData,
      birthday: new Date(),
      createdAt: new Date(),
    };


    const userObjId = (await userCollection.insertOne(userModel)).insertedId;

    const updatedUserData: UserProps = {
      firstName: Name.createFromPersistence(userModel.firstName),
      lastName: Name.createFromPersistence('Ferreira'),
      email: Email.createFromPersistence(userModel.email),
      cpf: Cpf.createFromPersistence(userModel.cpf),
      role: Role.customer,
      phone: Phone.createFromPersistence('22547854777'),
      birthday: Birthday.createFromPersistence(userModel.birthday),
    };

    const userId = userObjId.toString()

    await repository.update(userId, updatedUserData);

    const foundUser = await userCollection.findOne({
      _id: userObjId,
    });

    expect(foundUser?._id.toString()).toBe(userId);
    expect(foundUser?.lastName).toBe(updatedUserData.lastName.getValue());
    expect(foundUser?.phone).toBe(updatedUserData.phone.getValue());
  });

  test('should delete an existing customer', async () => {
    const { userCollection, userData } = await makeSut();
    const userModel = {
      _id: new ObjectId(),
      userId: new ObjectId(),
      ...userData,
      birthday: new Date(),
      createdAt: new Date(),
    };

    userCollection.insertOne(userModel);
    const createdUser = await userCollection.findOne({ _id: userModel._id });

    if (createdUser === null) {
      throw Error('User was not created');
    }

    await repository.delete(userModel._id.toString());
    const user = await userCollection.findOne({ _id: userModel._id });

    expect(createdUser?._id.toString()).toBe(userModel._id.toString());
    expect(user).toBeFalsy();
  });
});
