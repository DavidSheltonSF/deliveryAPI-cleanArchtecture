import { CustomerRepository } from '../../../application/_ports/customer-repository';
import { Customer } from '../../../domain/entities/customer/Customer';
import { CustomerModelMapper } from '../../mappers/mongodb/CustomerModelMapper';
import { CustomerModel } from '../../models/mongodb/CustomerModel';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbCustomerRepository implements CustomerRepository {
  async findCustomerByEmail(email: string): Promise<CustomerModel | null> {
    const customerCollection = mongoHelper.getCollection('customers');

    const foundCustomer = await customerCollection.findOne({ email: email });

    return CustomerModelMapper.fromMongodbDocumentToModel(foundCustomer);
  }

  async add(customer: Customer): Promise<CustomerModel> {
    const customerCollection = mongoHelper.getCollection('customers');

    const customerModel = CustomerModelMapper.fromEntityToModel(customer);

    const newCustomer = {
      ...customerModel,
      createdAT: new Date(),
    };

    const newCustomerId = await customerCollection
      .insertOne(newCustomer)
      .then((result) => result.insertedId);

    const registeredCustomer = await customerCollection.findOne({
      _id: newCustomerId,
    });

    return CustomerModelMapper.fromMongodbDocumentToModel({
      _id: newCustomerId,
      ...registeredCustomer,
    });
  }
}
