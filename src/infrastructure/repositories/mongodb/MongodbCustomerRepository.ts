import { CustomerRepository } from '../../../application/_ports/customer-repository';
import { Customer } from '../../../domain/entities/user/customer/Customer';
import { UserModel } from '../../models/mongodb/UserModel';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbCustomerRepository implements CustomerRepository {
  async findCustomerByEmail(email: string): Promise<UserModel | null> {
    const customerCollection = mongoHelper.getCollection('customers');
    const foundCustomer = await customerCollection.findOne({ email });

    return {
      _id: foundCustomer._id,
      username: foundCustomer.username,
      name: foundCustomer.name,
      email: foundCustomer.email,
      cpf: foundCustomer.cpf,
      role: foundCustomer.role,
      phone: foundCustomer.phone,
      createdAt: foundCustomer.createdAt,
    };
  }

  async add(customer: Customer): Promise<UserModel | null> {
    const customerCollection = mongoHelper.getCollection('customer');
    const customerUserModel: UserModel = {
      _id: mongoHelper.toObjectId(customer.id),
      username: customer.username.get(),
      name: customer.name.get(),
      email: customer.email.get(),
      cpf: customer.cpf.get(),
      role: customer.role.get(),
      phone: customer.phone.get(),
      createdAt: new Date(),
    };

    const newCustomerId = await customerCollection
      .insertOne(customerUserModel)
      .then((result: any) => result.insertedId);

    const registeredCustomer = await customerCollection.findOne({
      _id: newCustomerId,
    });

    if (registeredCustomer === null) {
      return null;
    }

    return {
      _id: newCustomerId,
      username: registeredCustomer.username,
      name: registeredCustomer.name,
      email: registeredCustomer.email,
      cpf: registeredCustomer.cpf,
      role: registeredCustomer.role,
      phone: registeredCustomer.phone,
      createdAt: registeredCustomer.createdAt,
    };
  }
}
