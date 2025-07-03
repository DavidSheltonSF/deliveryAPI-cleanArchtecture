import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbUserRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbUserRepository';
import { MockData } from '../../../helpers/MockData';
import { CustomerUser } from '../../../../src/domain/entities/user/customer/CustomerUser';
import { Address } from '../../../../src/domain/entities/address/Address';
import { ZipCode } from '../../../../src/domain/value-objects';
import { Authentication } from '../../../../src/domain/entities/authentication/Authentication';
import { ObjectId } from 'mongodb';
config();

const repository = new MongodbUserRepository();

describe('Testing MongodbUserRepository', () => {
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

  test('Should find a user by email', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const userModel1 = MockData.mockUserModel(true);
    const userModel2 = MockData.mockUserModel(true);

    // Adding new users to database
    await userCollection.insertOne(userModel1);
    await userCollection.insertOne(userModel2);

    const foundUser = await repository.findUserByEmail(userModel1.email);

    expect(foundUser?.username).toBe(userModel1.username);
    expect(foundUser?.name).toBe(userModel1.name);
    expect(foundUser?.email).toBe(userModel1.email);
    expect(foundUser?.cpf).toBe(userModel1.cpf);
    expect(foundUser?.phone).toBe(userModel1.phone);
    expect(foundUser?.role).toBe(userModel1.role);
  });

  test('Should add a new user in the database', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const {
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      address,
      authentication,
    } = await MockData.mockUserProps('customer');

    let customerAddress = address;
    if (customerAddress === undefined) {
      customerAddress = {
        street: 'Fake Street',
        city: 'Fake City',
        state: 'Fake State',
        zipCode: ZipCode.create('58458426').getRight(),
      };
    }

    const addressId = new ObjectId().toString();
    const newAddress = new Address(
      addressId,
      customerAddress.street,
      customerAddress.city,
      customerAddress.state,
      customerAddress.zipCode
    );

    const authenticationId = new ObjectId().toString();
    const newAuthentication = new Authentication(
      authenticationId,
      email,
      authentication.passwordHash
    );

    const customerId = new ObjectId().toString();
    const userEntity = new CustomerUser(
      customerId,
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      newAddress,
      newAuthentication
    );

    // Adding new users to database
    const response = await repository.add(userEntity);

    console.log(response);

    const foundUser = await userCollection.findOne({
      email: userEntity.email.get(),
    });

    expect(response?._id).toBeTruthy();
    expect(response?.username).toBe(userEntity.username.get());
    expect(response?.name).toBe(userEntity.name.get());
    expect(response?.email).toBe(userEntity.email.get());
    expect(response?.cpf).toBe(userEntity.cpf.get());
    expect(response?.phone).toBe(userEntity.phone.get());
    expect(response?.role).toBe(userEntity.role.get());
    expect(response?.birthday.getTime()).toBe(
      userEntity.birthday.get().getTime()
    );

    expect(foundUser?.username).toBe(userEntity.username.get());
    expect(foundUser?.name).toBe(userEntity.name.get());
    expect(foundUser?.email).toBe(userEntity.email.get());
    expect(foundUser?.cpf).toBe(userEntity.cpf.get());
    expect(foundUser?.phone).toBe(userEntity.phone.get());
    expect(foundUser?.role).toBe(userEntity.role.get());
    expect(foundUser?.birthday.getTime()).toBe(
      userEntity.birthday.get().getTime()
    );
  });
});
