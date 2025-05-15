import { UserRepository } from "../../../application/_ports/user-repository";
import { UserProps } from "../../../domain/entities/user-props";
import { UserMapper } from "../../../domain/entities/user-props";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbUserRepository implements UserRepository {
  
  async findAllUsers (): Promise<UserProps[]> {
    const userCollection = mongoHelper.getCollection('users');
    // Select all fields but not 
    // authentication.salt nor authentication.sessionToken
    const result = await userCollection.find().project({
      'authentication.salt': 0,
      'authentication.sesstionToken': 0
    }).toArray();

    if (result){
      const users = result.map((elem) => {
        return UserMapper.toUser(elem);
      });

      return users;
    }
    return [];
  }

  async findUserByEmail (email: string): Promise<UserProps | null> {
    const userCollection = mongoHelper.getCollection('users');
    const result = await userCollection?.findOne({ email });

    if (result){
      return UserMapper.toUser(result);
    }

    return null;
  }

  async findUserById (userId: string): Promise<UserProps | null> {
    const userCollection = mongoHelper.getCollection('users');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(userId);
    const result = await userCollection?.findOne({_id: objId});

    if (result){
      return UserMapper.toUser(result);
    }

    return null;
  }

  async exists (email: string): Promise<boolean> {
    const existingUser = this.findUserByEmail(email);
    if (existingUser){
      return true;
    }

    return false
  }

  async add (user: Omit<UserProps, "_id">): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection?.insertOne(user);
  }

  async update (userId: string, userProps: Omit<UserProps, '_id'>): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection.updateOne(
      {_id: mongoHelper.toObjectId(userId)},
      {$set: userProps}
    );
  }

  async remove (userId: string): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection.deleteOne(
      {_id: mongoHelper.toObjectId(userId)}
    );
  }
}