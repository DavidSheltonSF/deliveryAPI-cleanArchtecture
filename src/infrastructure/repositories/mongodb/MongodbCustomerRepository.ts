import { CustomerRepository } from '../../../application/_ports/CustomerRepository';
import { CustomerUser } from '../../../domain/entities/user/customer/CustomerUser';
import { CustomerModel } from '../../models/mongodb/CustomerModel';
import { mongoHelper } from './helpers/mongo-helper';
import {
  entityToCustomerModel,
  persistenceToCustomerModel,
} from './mappers/customerMappers';

export class MongodbCustomerRepository implements CustomerRepository {
  async findAll(): Promise<CustomerModel[]> {
    const userCollection = mongoHelper.getCollection('users');
    const foundUsers = await userCollection.find().toArray();

    const mappedCustomers = foundUsers.map((customer) => {
      return persistenceToCustomerModel(customer);
    });

    return mappedCustomers;
  }

  async findByEmail(email: string): Promise<CustomerModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const foundUser = await userCollection.findOne({ email });

    return persistenceToCustomerModel(foundUser);
  }

  async add(customer: CustomerUser): Promise<CustomerModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const customerModel = entityToCustomerModel(customer);

    const newUserId = await userCollection
      .insertOne(customerModel)
      .then((result: any) => result.insertedId);

    const createdCustomer = await userCollection.findOne({
      _id: newUserId,
    });

    if (createdCustomer === null) {
      return null;
    }

    return persistenceToCustomerModel(createdCustomer);
  }
}
