import { mongoHelper } from '../helpers/mongo-helper';
import { config } from 'dotenv';
import { rawUserToCustomerProps } from './customerMappers';
import { BcryptHasher } from '../../../cryptography/BcryptHasher';
import { CustomerUser } from '../../../../domain/entities/user/customer/CustomerUser';
import { AddressFactory } from '../../../../domain/factories/AddressFactory';
import { ZipCode } from '../../../../domain/value-objects';

config();

describe('Testing customer mappers', () => {
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

  const customers = [
    {
      username: 'John58633',
      name: 'John',
      email: 'jojo@email.com',
      cpf: '12587458567',
      phone: '21585874788',
      role: 'customer',
      birthday: '2000-05-20',
      address: {
        street: 'Test Street',
        city: 'Maringá',
        state: 'Pará',
        zipCode: '25874456',
      },
      authentication: {
        password: 'D@41refesfsfa*',
      },
    },
    {
      username: 'Dane77',
      name: 'Daniel',
      email: 'daniel@email.com',
      cpf: '12587458567',
      phone: '23885874788',
      role: 'customer',
      birthday: '2000-05-20',
      address: {
        street: 'Test Street',
        city: 'Maringá',
        state: 'Pará',
        zipCode: '25874476',
      },
      authentication: {
        password: 'D@41refsFFesfsfa',
      },
    },
  ];

  test('Should map CustomerUser entity to CustomerModel', async () => {
    const customer1 = customers[0];

    const hasher = new BcryptHasher(12);
    const propsOrError = await rawUserToCustomerProps(customer1, hasher);
    const customerProps = propsOrError.getRight();

    const addressEntity = AddressFactory.create({
      street: customer1.address.street,
      city: customer1.address.city,
      state: customer1.address.state,
      zipCode: ZipCode.create(customer1.address.zipCode).getRight(),
    });
    
    const authenticationEntity = 


    const customerEntity = new CustomerUser(
      customerProps.username,
      customerProps.name,
      customerProps.email,
      customerProps.cpf,
      customerProps.phone,
      customerProps.role,
      customerProps.birthday,
      addressEntity,

    );
  });

  test('Should map UserDTO to CustomerProps', async () => {
    const customer1 = customers[0];

    const hasher = new BcryptHasher(12);
    const propsOrError = await rawUserToCustomerProps(customer1, hasher);

    const customerProps = propsOrError.getRight();

    expect(customerProps.username?.get()).toBe(customer1.username);
    expect(customerProps.name?.get()).toBe(customer1.name);
    expect(customerProps.email?.get()).toBe(customer1.email);
    expect(customerProps.cpf?.get()).toBe(customer1.cpf);
    expect(customerProps.phone?.get()).toBe(customer1.phone);
    expect(customerProps.role?.get()).toBe(customer1.role);
    expect(customerProps.birthday?.get().getTime()).toBe(
      new Date(customer1.birthday).getTime()
    );
    expect(customerProps.address?.street).toBe(customer1.address.street);
    expect(customerProps.address?.city).toBe(customer1.address.city);
    expect(customerProps.address?.state).toBe(customer1.address.state);
    expect(customerProps.address?.zipCode.get()).toBe(
      customer1.address.zipCode
    );
  });
});
