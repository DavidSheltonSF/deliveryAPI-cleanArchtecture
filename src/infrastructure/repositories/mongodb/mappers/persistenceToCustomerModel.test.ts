import { config } from 'dotenv';
import { mongoHelper } from '../helpers/mongo-helper';
import { persistenceToCustomerModel } from './persistenceToCustomerModel';

config();

describe('Testing persistenceToCustomerModel function', () => {
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

  const customers = [
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

  test('Should parse a customer mongodb document to CustomerModel properly', async () => {
    const userCollection = mongoHelper.getCollection('users');
    const customer1 = customers[0];
    const customer2 = customers[1];

    await userCollection.insertOne(customer1);
    await userCollection.insertOne(customer2);

    const userDocument = await userCollection.findOne({
      email: customer1.email,
    });

    if (userDocument === null) {
      throw Error('User not found');
    }

    const userModel = persistenceToCustomerModel(userDocument);

    expect(userModel._id).toBe(userDocument._id);
    expect(userModel.username).toBe(userDocument.username);
    expect(userModel.name).toBe(userDocument.name);
    expect(userModel.email).toBe(userDocument.email);
    expect(userModel.cpf).toBe(userDocument.cpf);
    expect(userModel.phone).toBe(userDocument.phone);
    expect(userModel.role).toBe(userDocument.role);
    expect(userModel.birthday.getTime()).toBe(userDocument.birthday.getTime());
    expect(userModel.createdAt.getTime()).toBe(
      userDocument.createdAt.getTime()
    );
  });
});
