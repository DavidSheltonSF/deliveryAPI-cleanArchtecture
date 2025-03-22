import { UserRepository } from "application/usecases/ports/user-repository";
import { User as UserData } from "domain/entities/user";
import { UserMapper } from "../../../domain/entities/user";
import { mongoHelper } from "./helpers/mongo-helper";

//testing
export class MongodbUserRepository implements UserRepository {
  
  async findAllUsers (): Promise<UserData[]> {
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

  async findUserByEmail (email: string): Promise<UserData | null> {
    const userCollection = mongoHelper.getCollection('users');
    const result = await userCollection?.findOne({ email });

    if (result){
      return UserMapper.toUser(result);
    }

    return null;
  }

  async findUserById (userId: string): Promise<UserData | null> {
    const userCollection = mongoHelper.getCollection('users');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(userId);
    const result = await userCollection?.findOne({_id: objId});

    if (result){
      return UserMapper.toUser(result);
    }

    return null;
  }

  async add (user: UserData): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection?.insertOne(user);
  }

  async update (userId: string, userData: UserData): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection.updateOne(
      {_id: mongoHelper.toObjectId(userId)},
      {$set: userData}
    );
  }

  async remove (userId: string): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    await userCollection.deleteOne(
      {_id: mongoHelper.toObjectId(userId)}
    );
  }
}