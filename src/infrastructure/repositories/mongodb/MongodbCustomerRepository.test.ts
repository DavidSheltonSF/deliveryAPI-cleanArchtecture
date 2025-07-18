import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { CustomerUser } from '../../../../src/domain/entities/user/customer/CustomerUser';
import { Address } from '../../../../src/domain/entities/address/Address';
import { ZipCode } from '../../../../src/domain/value-objects';
import { Authentication } from '../../../../src/domain/entities/authentication/Authentication';
import { ObjectId } from 'mongodb';
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

  const users = [
    {
      username: 'John58633',
      name: 'John',
      email: 'jojo@email.com',
      cpf: '12587458567',
      phone: '21585874788',
      role: 'customer',
      birthday: new Date('2002-05-25'),
      createdAt: new Date(),
    },
    {
      username: 'Dane77',
      name: 'Daniel',
      email: 'daniel@email.com',
      cpf: '12587458567',
      phone: '23885874788',
      role: 'customer',
      birthday: new Date('2000-05-20'),
      createdAt: new Date(),
    },
  ];

  test('Should find a user by email', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const user1 = users[0];
    const user2 = users[1];
  
    // Adding new users to database
    await userCollection.insertOne(user1);
    await userCollection.insertOne(user2);

    const foundUser = await repository.findByEmail(user1.email);

    expect(foundUser?.username).toBe(user1.username);
    expect(foundUser?.name).toBe(user1.name);
    expect(foundUser?.email).toBe(user1.email);
    expect(foundUser?.cpf).toBe(user1.cpf);
    expect(foundUser?.phone).toBe(user1.phone);
    expect(foundUser?.role).toBe(user1.role);
  });

  // test('Should add a new user in the database', async () => {
  //   const userCollection = mongoHelper.getCollection('users');

  //   const {
  //     username,
  //     name,
  //     email,
  //     cpf,
  //     phone,
  //     role,
  //     birthday,
  //     address,
  //     authentication,
  //   } = await MockData.mockUserProps('customer');

  //   let customerAddress = address;
  //   if (customerAddress === undefined) {
  //     customerAddress = {
  //       street: 'Fake Street',
  //       city: 'Fake City',
  //       state: 'Fake State',
  //       zipCode: ZipCode.create('58458426').getRight(),
  //     };
  //   }

  //   const addressId = new ObjectId().toString();
  //   const newAddress = new Address(
  //     addressId,
  //     customerAddress.street,
  //     customerAddress.city,
  //     customerAddress.state,
  //     customerAddress.zipCode
  //   );

  //   const authenticationId = new ObjectId().toString();
  //   const newAuthentication = new Authentication(
  //     authenticationId,
  //     email,
  //     authentication.passwordHash
  //   );

  //   const customerId = new ObjectId().toString();
  //   const userEntity = new CustomerUser(
  //     customerId,
  //     username,
  //     name,
  //     email,
  //     cpf,
  //     phone,
  //     role,
  //     birthday,
  //     newAddress,
  //     newAuthentication
  //   );

  //   // Adding new users to database
  //   const response = await repository.add(userEntity);

  //   console.log(response);

  //   const foundUser = await userCollection.findOne({
  //     email: userEntity.email.get(),
  //   });

  //   expect(response?._id).toBeTruthy();
  //   expect(response?.username).toBe(userEntity.username.get());
  //   expect(response?.name).toBe(userEntity.name.get());
  //   expect(response?.email).toBe(userEntity.email.get());
  //   expect(response?.cpf).toBe(userEntity.cpf.get());
  //   expect(response?.phone).toBe(userEntity.phone.get());
  //   expect(response?.role).toBe(userEntity.role.get());
  //   expect(response?.birthday.getTime()).toBe(
  //     userEntity.birthday.get().getTime()
  //   );

  //   expect(foundUser?.username).toBe(userEntity.username.get());
  //   expect(foundUser?.name).toBe(userEntity.name.get());
  //   expect(foundUser?.email).toBe(userEntity.email.get());
  //   expect(foundUser?.cpf).toBe(userEntity.cpf.get());
  //   expect(foundUser?.phone).toBe(userEntity.phone.get());
  //   expect(foundUser?.role).toBe(userEntity.role.get());
  //   expect(foundUser?.birthday.getTime()).toBe(
  //     userEntity.birthday.get().getTime()
  //   );
  // });
});
