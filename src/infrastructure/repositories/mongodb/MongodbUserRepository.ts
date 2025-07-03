import { UserRepository } from '../../../application/_ports/UserRepository';
import { CustomerUser } from '../../../domain/entities/user/customer/CustomerUser';
import { UserModel } from '../../models/mongodb/UserModel';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbUserRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const foundUser = await userCollection.findOne({ email });

    return {
      _id: foundUser._id,
      username: foundUser.username,
      name: foundUser.name,
      email: foundUser.email,
      cpf: foundUser.cpf,
      phone: foundUser.phone,
      role: foundUser.role,
      birthday: foundUser.birthday,
      createdAt: foundUser.createdAt,
    };
  }

  async add(user: CustomerUser): Promise<UserModel | null> {
    const userCollection = mongoHelper.getCollection('users');
    const userUserModel: UserModel = {
      _id: mongoHelper.toObjectId(user.id),
      username: user.username.get(),
      name: user.name.get(),
      email: user.email.get(),
      cpf: user.cpf.get(),
      phone: user.phone.get(),
      role: user.role.get(),
      birthday: user.birthday.get(),
      createdAt: new Date(),
    };

    const newUserId = await userCollection
      .insertOne(userUserModel)
      .then((result: any) => result.insertedId);

    const registeredUser = await userCollection.findOne({
      _id: newUserId,
    });

    if (registeredUser === null) {
      return null;
    }

    return {
      _id: newUserId,
      username: registeredUser.username,
      name: registeredUser.name,
      email: registeredUser.email,
      cpf: registeredUser.cpf,
      phone: registeredUser.phone,
      role: registeredUser.role,
      birthday: registeredUser.birthday,
      createdAt: registeredUser.createdAt,
    };
  }
}
