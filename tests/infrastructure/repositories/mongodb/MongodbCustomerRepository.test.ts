import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-customer-repository';
import { CustomerDtoMapper } from '../../../../src/presentation/mappers/CustomerDtoMapper';
import { CustomerDto } from '../../../../src/presentation/dtos/custumer-dto';
import { Customer } from '../../../../src/domain/entities/customer/Customer';
import { MockData } from '../../../helpers/MockData';

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
    await mongoHelper.clearCollection('customers');
  });

  test('Should  find a user by email', async () => {
    const customerCollection = mongoHelper.getCollection('customers');

    const customerModel1 = MockData.mockCustomerModel(true);
    const customerModel2 = MockData.mockCustomerModel(true);

    // Adding new customers to database
    await customerCollection.insertOne(customerModel1);
    await customerCollection.insertOne(customerModel2);

    const foundCustomer = await repository.findCustomerByEmail(
      customerModel1.email
    );

    expect(foundCustomer?.username).toBe(customerModel1.username);
    expect(foundCustomer?.name).toBe(customerModel1.name);
    expect(foundCustomer?.email).toBe(customerModel1.email);
    expect(foundCustomer?.cpf).toBe(customerModel1.cpf);
    expect(foundCustomer?.phone).toBe(customerModel1.phone);
    expect(foundCustomer?.role).toBe(customerModel1.role);
  });

  test('Should add a new customer in the database', async () => {
    const customerCollection = mongoHelper.getCollection('customers');

    const customerProps = await MockData.mockCustomerProps();
    const customerEntity = new Customer(customerProps);

    // Adding new customers to database
    const response = await repository.add(customerEntity);

    const foundCustomer = await customerCollection.findOne({
      email: customerEntity.email.get(),
    });

    expect(response?._id).toBeTruthy();
    expect(response?.username).toBe(customerEntity.username.get());
    expect(response?.name).toBe(customerEntity.name.get());
    expect(response?.email).toBe(customerEntity.email.get());
    expect(response?.cpf).toBe(customerEntity.cpf.get());
    expect(response?.phone).toBe(customerEntity.phone.get());
    expect(response?.role).toBe(customerEntity.role.get());
    expect(response?.birthday).toBe(customerEntity.birthday.get());

    expect(foundCustomer?.username).toBe(customerEntity.username.get());
    expect(foundCustomer?.name).toBe(customerEntity.name.get());
    expect(foundCustomer?.email).toBe(customerEntity.email.get());
    expect(foundCustomer?.cpf).toBe(customerEntity.cpf.get());
    expect(foundCustomer?.phone).toBe(customerEntity.phone.get());
    expect(foundCustomer?.role).toBe(customerEntity.role.get());
    expect(foundCustomer?.birthday).toBe(customerEntity.birthday.get());
  });
});
