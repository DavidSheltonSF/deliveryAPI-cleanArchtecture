import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { generateHexId } from '../../../../src/shared/generateHexId';
import {CustomerMapper} from '../../../../src/application/mappers/CustomerMapper'

config();

const repository = new MongodbCustomerRepository();

const customerId0 = '5a071d9379964c1c8ed80efa';
const customerId1 = generateHexId();

const customers = [
  {
    id: customerId0,
    username: 'Marta',
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
    id: customerId1,
    username: 'Oswaldo',
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

  test('Should add a new customer in the database', async () => {
    const customerCollection = mongoHelper.getCollection('customers');

    const { id, ...customerWithoudID } = customers[0];


    const customerOrError = CustomerMapper.fromDtoToProps(customerWithoudID)

    // Adding new customers to database
    const response = await repository.add(customerOrError.getRight());

    const foundCustomer = await customerCollection.findOne({ email: customerWithoudID.email });

    expect(foundCustomer?.customername).toBe(customerWithoudID.username);
    expect(foundCustomer?.email).toBe(customerWithoudID.email);
    expect(foundCustomer?.cpf).toBe(customerWithoudID.cpf);
    expect(foundCustomer?.phone).toBe(customerWithoudID.phone);
    expect(foundCustomer?.role).toBe(customerWithoudID.role);

  });

});
