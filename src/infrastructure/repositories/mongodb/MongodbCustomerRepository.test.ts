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

    return { customer, createUserData, hasher, userCollection };
  }

  test('should create a new customer in the database', async () => {
    const { customer, userCollection } = await makeSut();

    const newCustomer = await repository.create(customer);

    if (newCustomer === null) {
      throw Error('User not created');
    }

    const id = newCustomer._id;

    const foundCustomer = await userCollection.findOne({ _id: id });
    console.log(foundCustomer);

    expect(newCustomer.username).toBe(foundCustomer?.username);
    expect(newCustomer.name).toBe(foundCustomer?.name);
    expect(newCustomer.email).toBe(foundCustomer?.email);
    expect(newCustomer.cpf).toBe(foundCustomer?.cpf);
    expect(newCustomer.phone).toBe(foundCustomer?.phone);
    expect(newCustomer.role).toBe(foundCustomer?.role);
  });
});
