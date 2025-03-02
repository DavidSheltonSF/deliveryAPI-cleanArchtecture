import { UserRepository } from "usecases/ports/user-repository";
import { User, User as UserData } from "entities/user";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbUserRepository implements UserRepository {
  async findAllUsers (): Promise<UserData[]> {
    const users = await mongoHelper.getCollection('users').find().toArray();

    if (users){
      const result = users.map((elem) => {
        const { 
          username,
          email,
          cpf,
          phone,
          role,
          address,
          authentication,
          bankInfo
         } = elem

         return { 
          username,
          email,
          cpf,
          phone,
          role,
          address,
          authentication,
          bankInfo
         }
      });

    return result;
    }
    return []
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    const userCollection = mongoHelper.getCollection('users');
    const user = await userCollection?.findOne({email})

    if (user){
      const { 
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
       } = user

       return { 
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
       }
    }

    return null;
  }

  async findUserById (userId: string): Promise<UserData | null> {
    const userCollection = mongoHelper.getCollection('users');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(userId);
    const user = await userCollection?.findOne({_id: objId});

    if (user){
      const { 
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
       } = user

       return { 
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
       }
    }

    return null;
  }

  async add (user: UserData): Promise<void> {
    const userCollection = mongoHelper.getCollection('users');
    const existingUser = await this.findUserByEmail(user.email);

    if(!existingUser){
      await userCollection?.insertOne(user);
    }
  }

  async update (userId: string, userData: UserData): Promise<void> {
    const existingUser = await this.findUserByEmail(userData.email);
    
    if (existingUser){
      const userCollection = mongoHelper.getCollection('users');
      await userCollection.updateOne(
        {_id: mongoHelper.toObjectId(userId)}, userData
      );
    }
  }

  async remove (userId: string): Promise<void> {
    const existingUser = this.findUserById(userId);

    if (existingUser){
      const userCollection = mongoHelper.getCollection('users');
      await userCollection.deleteOne(
        {_id: mongoHelper.toObjectId(userId)}
      )
    }
  }

}