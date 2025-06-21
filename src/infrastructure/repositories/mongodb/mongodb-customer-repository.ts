import { CustomerRepository } from '../../../application/_ports/customer-repository';
import { CustomerProps } from '../../../domain/entities/customer-props';
import { CustomerModel } from '../../models/mongodb/customer-model';
import { MongodbMapper } from './helpers/MongodbMapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbCustomerRepository implements CustomerRepository {
  async add(customerData: CustomerProps): Promise<CustomerModel> {
    const customerCollection = mongoHelper.getCollection('customers');

    const newCustomer = {
      customername: customerData.username.get(),
      email: customerData.email.get(),
      cpf: customerData.cpf.get(),
      phone: customerData.phone.get(),
      role: customerData.role.get(),
      address: customerData.address.get(),
      authentication: {
        passwordHash: customerData.authentication.hashedPassword.get(),
        sessionToken: customerData.authentication?.sessionToken,
      },
      createdAT: new Date(),
    };

    const newCustomerId = await customerCollection
      .insertOne(newCustomer)
      .then((result) => result.insertedId);

    const registeredCustomer = await customerCollection.findOne({
      _id: newCustomerId,
    });

    return MongodbMapper.fromCustomerDbToModel(registeredCustomer);
  }
}
