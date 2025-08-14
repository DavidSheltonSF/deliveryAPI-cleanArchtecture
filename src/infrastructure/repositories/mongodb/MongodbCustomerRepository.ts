import { ObjectId } from 'mongodb';
import { CustomerRepository } from '../../../application/ports/CustomerRepository';
import { UserModel } from '../../models/mongodb/UserModel';
import { mongoHelper } from './helpers/mongo-helper';
import { CustomerMapper } from '../../../mappers/CustomerMapper';
import { stringToObjectId } from './helpers/stringToObjectId';

export class MongodbCustomerRepository implements CustomerRepository {
  async findAll(): Promise<UserModel[]> {
    const userCollection = mongoHelper.getCollection('users');
    const foundUsers = await userCollection.find().toArray();

    const mappedCustomers = foundUsers.map((customer) => {
      return CustomerMapper.persistenceToUserModel(customer);
    });

    return mappedCustomers;
  }

  async findById(id: string): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const userId = new ObjectId(id);
    const foundUser = await userCollection.findOne({ _id: userId });
    return CustomerMapper.persistenceToUserModel(foundUser);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const foundUser = await userCollection.findOne({ email });

    return CustomerMapper.persistenceToUserModel(foundUser);
  }

  async create(customer: CustomerUser): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const userModel = CustomerMapper.entityToUserModel(customer);
    const userData = {
      ...userModel,
      _id: stringToObjectId(userModel._id),
    };

    const newUserId = await userCollection
      .insertOne(userData)
      .then((result: any) => result.insertedId);

    const createdCustomer = await userCollection.findOne({
      _id: newUserId,
    });

    if (createdCustomer === null) {
      return null;
    }

    return CustomerMapper.persistenceToUserModel(createdCustomer);
  }

  async update(customer: CustomerUser): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const userModel = CustomerMapper.entityToUserModel(customer);
    const customerId = userModel._id;
    delete userModel._id;
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: stringToObjectId(customerId) },
      { $set: userModel },
      { returnDocument: 'after' }
    );

    if (updatedUser === null) {
      return null;
    }

    return CustomerMapper.persistenceToUserModel(updatedUser);
  }

  async delete(id: string): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const customerId = new ObjectId(id);
    const deletedCustomer = await userCollection.findOneAndDelete({
      _id: customerId,
    });

    if (deletedCustomer === null) {
      return null;
    }

    return CustomerMapper.persistenceToUserModel(deletedCustomer);
  }
}
