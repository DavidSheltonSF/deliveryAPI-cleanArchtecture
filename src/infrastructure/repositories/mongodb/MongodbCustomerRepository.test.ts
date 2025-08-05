import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { CustomerUser } from '../../../domain/entities/CustomerUser';
import { Address } from '../../../domain/entities/Address';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { Authentication } from '../../../domain/entities/Authentication';
import { AddressMapper } from '../../../mappers/AddressMapper';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { UserMocker } from '../../../tests/mocks/UserMocker';
import { AddressMocker } from '../../../tests/mocks/AddressMocker';
import { AuthenticationMocker } from '../../../tests/mocks/AuthenticationMocker';
import { CustomerMapper } from '../../../mappers/CustomerMapper';
import { Birthday, Cpf, Name } from '../../../domain/value-objects';
import { UserModel } from '../../models/mongodb/UserModel';
import { ObjectId } from 'mongodb';
import { Role } from '../../../domain/_enums';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AddressModel } from '../../models/mongodb/AddressModel';
import { AuthenticationModel } from '../../models/mongodb/AuthenticationModel';
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
    await mongoHelper.clearCollection('users');
  });

  async function makeSut() {
    const hasher = makeMockHasher();
    const userCollection = mongoHelper.getCollection('users');

    const userData = UserMocker.mockUserDTO();
    const addressData = AddressMocker.mockAddressDTO();
    const authData = AuthenticationMocker.mockAuthenticationDTO();

    const createUserData = {
      user: userData,
      address: addressData,
      authentication: authData,
    };

    const addressPropsOrError = AddressMapper.rawToProps(addressData);
    const authPropsOrError = await AuthenticationMapper.rawToProps(
      authData,
      hasher
    );
    const userPropsOrError = CustomerMapper.rawToProps(userData);

    const addressProps = addressPropsOrError.getRight();
    const authProps = authPropsOrError.getRight();
    const userProps = userPropsOrError.getRight();

    const address = Address.create(addressProps);
    const authentication = Authentication.create(authProps, hasher);
    const customer = CustomerUser.create(userProps, address, authentication);

    return {
      customer,
      address,
      authentication,
      createUserData,
      hasher,
      userCollection,
    };
  }

  test('should create a new customer in the database', async () => {
    const { customer, userCollection } = await makeSut();

    const newCustomer = await repository.create(customer);

    if (newCustomer === null) {
      throw Error('User not created');
    }

    const id = newCustomer._id;

    const foundCustomer = await userCollection.findOne({
      _id: stringToObjectId(id),
    });
    console.log(foundCustomer);

    expect(newCustomer.username).toBe(foundCustomer?.username);
    expect(newCustomer.name).toBe(foundCustomer?.name);
    expect(newCustomer.email).toBe(foundCustomer?.email);
    expect(newCustomer.cpf).toBe(foundCustomer?.cpf);
    expect(newCustomer.phone).toBe(foundCustomer?.phone);
    expect(newCustomer.role).toBe(foundCustomer?.role);
  });

  test('should update an existing customer', async () => {
    const { userCollection, createUserData, address, authentication } =
      await makeSut();

    const userData = createUserData.user;

    const userModel: UserModel = {
      _id: new ObjectId().toString(),
      ...userData,
      birthday: new Date(),
      createdAt: new Date(),
    };

    // Only createFromPersistence can set an Id to the entity
    // It uses the Id provided by a UserModel
    const customer = CustomerUser.createFromPersistence(
      userModel,
      address,
      authentication
    );

    const updatedData = {
      name: 'José Updated',
      cpf: '11111111111',
    };

    const name = Name.createFromPersistence(updatedData.name);
    const cpf = Cpf.createFromPersistence(updatedData.cpf);

    customer.updateName(name);
    customer.updateCpf(cpf);

    await repository.create(customer);
    await repository.update(customer);

    const foundUser = await userCollection.findOne({
      _id: stringToObjectId(userModel._id),
    });

    expect(foundUser?._id.toString()).toBe(customer.id);
    expect(foundUser?.name).toBe(updatedData.name);
    expect(foundUser?.cpf).toBe(updatedData.cpf);
  });

  test('should delete an existing customer', async () => {
    const { userCollection, createUserData } = await makeSut();
    const userData = createUserData.user;
    const userModel = {
      _id: new ObjectId(),
      userId: new ObjectId(),
      ...userData,
      birthday: new Date(),
      createdAt: new Date(),
    }

    userCollection.insertOne(userModel);
    const insertedUser = await userCollection.findOne({ _id: userModel._id });
    
    await repository.delete(userModel._id.toString());
    const user = await userCollection.findOne({ _id: userModel._id });

    expect(insertedUser?._id.toString()).toBe(userModel._id.toString());
    expect(user).toBeFalsy();

  });
});
