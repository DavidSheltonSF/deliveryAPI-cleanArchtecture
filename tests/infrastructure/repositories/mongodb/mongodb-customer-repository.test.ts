import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { generateHexId } from '../../../../src/shared/generateHexId';
import { CustomerDtoMapper } from '../../../../src/presentation/mappers/CustomerDtoMapper';
import { CustomerDTO } from '../../../../src/presentation/dtos/custumer-dto';
import { Customer } from '../../../../src/domain/entities/customer/Customer';

config();

const repository = new MongodbCustomerRepository();

const customers: CustomerDTO[] = [
  {
    username: 'Marta',
    name: 'Maria dos Anjos',
    email: 'mart@bugmail.com',
    cpf: '88888888888',
    phone: '21555777777',
    role: 'admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22222220',
    },
    authentication: {
      password: 'teste123*Testing',
    },
  },
  {
    username: 'Oswaldo',
    name: 'Oswaldo Sanches',
    email: 'oswald@bugmail.com',
    cpf: '88888888588',
    phone: '21558777777',
    role: 'restaurant_admin',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22224420',
    },
    authentication: {
      password: 'teste1553*Testing',
    },
  },
];

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
    await mongoHelper.clearCollection('customers');
  });

  test('Should  find a user by email', async () => {
    const customerCollection = mongoHelper.getCollection('customers');

    const customer = customers[0];

    // Adding new customers to database
    await customerCollection.insertOne(customer);


    const foundCustomer = await repository.findCustomerByEmail(customer.email);;

    expect(foundCustomer?.username).toBe(customer.username);
    expect(foundCustomer?.name).toBe(customer.name);
    expect(foundCustomer?.email).toBe(customer.email);
    expect(foundCustomer?.cpf).toBe(customer.cpf);
    expect(foundCustomer?.phone).toBe(customer.phone);
    expect(foundCustomer?.role).toBe(customer.role);
  });

  test('Should add a new customer in the database', async () => {
    const customerCollection = mongoHelper.getCollection('customers');

    const customer = customers[0];

    const customerOrError = (await CustomerDtoMapper.fromDtoToProps(customer)).getRight();

    const customerEntity = new Customer(customerOrError)

    // Adding new customers to database
    const response = await repository.add(customerEntity);

    const foundCustomer = await customerCollection.findOne({
      email: customer.email,
    });

    expect(foundCustomer?.username).toBe(customer.username);
    expect(foundCustomer?.email).toBe(customer.email);
    expect(foundCustomer?.cpf).toBe(customer.cpf);
    expect(foundCustomer?.phone).toBe(customer.phone);
    expect(foundCustomer?.role).toBe(customer.role);
  });
});
