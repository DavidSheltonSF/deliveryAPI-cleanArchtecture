import { ObjectId } from 'mongodb';
import { CustomerRepository } from '../../../application/ports/CustomerRepository';
import { mongoHelper } from './helpers/mongo-helper';
import { UserMapper } from '../../../mappers/UserMapper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { WithId } from '../../../utils/types/WithId';
import { UserProps } from '../../../domain/entities/props/UserProps';
import { UserFactory } from '../../../factories/UserFactory';
import { Role } from '../../../domain/_enums';
import { entityCollectionMap } from './helpers/entityCollectionMap';

export class MongodbCustomerRepository implements CustomerRepository {
  async findAll(): Promise<WithId<UserProps>[]> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const foundUsers = await userCollection.find().toArray();

    const mappedCustomers = foundUsers.map((customer) => {
      if (customer.role === Role.customer) {
        return UserFactory.createFromPersistence({
          id: customer._id.toString(),
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          cpf: customer.cpf,
          role: customer.role,
          phone: customer.phone,
          birthday: customer.birthday,
          createdAt: customer.createdAt,
        });
      }
    });

    return mappedCustomers;
  }

  async findById(id: string): Promise<WithId<UserProps> | null> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const userId = new ObjectId(id);
    const foundUser = await userCollection.findOne({ _id: userId });
    return UserFactory.createFromPersistence({
      id: foundUser._id.toString(),
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      cpf: foundUser.cpf,
      role: foundUser.role,
      phone: foundUser.phone,
      birthday: foundUser.birthday,
      createdAt: foundUser.createdAt,
    });
  }

  async findByEmail(email: string): Promise<WithId<UserProps> | null> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const foundUser = await userCollection.findOne({ email });

    return UserFactory.createFromPersistence({
      id: foundUser._id.toString(),
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      cpf: foundUser.cpf,
      role: foundUser.role,
      phone: foundUser.phone,
      birthday: foundUser.birthday,
      createdAt: foundUser.createdAt,
    });
  }
  UserProps;
  async create(customer: UserProps): Promise<WithId<UserProps> | null> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const userModel = UserMapper.propsToPersistence(customer);
    const newUserId = await userCollection
      .insertOne(userModel)
      .then((result: any) => result.insertedId);

    const createdCustomer = await userCollection.findOne({
      _id: newUserId,
    });

    if (createdCustomer === null) {
      return null;
    }

    return UserFactory.createFromPersistence({
      id: createdCustomer._id.toString(),
      firstName: createdCustomer.firstName,
      lastName: createdCustomer.lastName,
      email: createdCustomer.email,
      cpf: createdCustomer.cpf,
      role: createdCustomer.role,
      phone: createdCustomer.phone,
      birthday: createdCustomer.birthday,
      createdAt: createdCustomer.createdAt,
    });
  }

  async update(
    id: string,
    customer: UserProps
  ): Promise<WithId<UserProps> | null> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const userModel = UserMapper.propsToPersistence(customer);
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: stringToObjectId(id) },
      { $set: userModel },
      { returnDocument: 'after' }
    );

    if (updatedUser === null) {
      return null;
    }

    return UserFactory.createFromPersistence({
      id: updatedUser._id.toString(),
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
      role: updatedUser.role,
      phone: updatedUser.phone,
      birthday: updatedUser.birthday,
      createdAt: updatedUser.createdAt,
    });
  }

  async delete(id: string): Promise<WithId<UserProps> | null> {
    const userCollection = mongoHelper.getCollection(entityCollectionMap.user);
    const customerId = new ObjectId(id);
    const deletedCustomer = await userCollection.findOneAndDelete({
      _id: customerId,
    });

    if (deletedCustomer === null) {
      return null;
    }

    return UserFactory.createFromPersistence({
      id: deletedCustomer._id.toString(),
      firstName: deletedCustomer.firstName,
      lastName: deletedCustomer.lastName,
      email: deletedCustomer.email,
      cpf: deletedCustomer.cpf,
      role: deletedCustomer.role,
      phone: deletedCustomer.phone,
      birthday: deletedCustomer.birthday,
      createdAt: deletedCustomer.createdAt,
    });
  }
}
