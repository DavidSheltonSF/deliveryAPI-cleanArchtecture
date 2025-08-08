import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { Authentication } from '../../../domain/entities/Authentication';
import { AuthenticationRepository } from '../../../application/ports/AuthenticationRepository';
import { HashService } from '../../../domain/contracts/HashService';

export class MongodbAuthenticationRepository
  implements AuthenticationRepository
{
  async findById(
    id: string,
    hasher: HashService
  ): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({
      _id: AuthenticationId,
    });
    return Authentication.createFromPersistence(
      {
        _id: foundAuth._id.toString(),
        userId: foundAuth.userId.toString(),
        passwordHash: foundAuth.passwordHash,
        sessionToken: foundAuth.sessionToken,
        createdAt: foundAuth.createdAt,
      },
      hasher
    );
  }

  async findByUserId(id: string, hasher: HashService): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const userId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({ userId });
     return Authentication.createFromPersistence(
       {
         _id: foundAuth._id.toString(),
         userId: foundAuth.userId.toString(),
         passwordHash: foundAuth.passwordHash,
         sessionToken: foundAuth.sessionToken,
         createdAt: foundAuth.createdAt,
       },
       hasher
     );
  }

  async findBySessionToken(token: string, hasher: HashService): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const foundAuth = await AuthenticationCollection.findOne({
      sessionToken: token,
    });
     return Authentication.createFromPersistence(
       {
         _id: foundAuth._id.toString(),
         userId: foundAuth.userId.toString(),
         passwordHash: foundAuth.passwordHash,
         sessionToken: foundAuth.sessionToken,
         createdAt: foundAuth.createdAt,
       },
       hasher
     );
  }

  async findByEmail(email: string, hasher: HashService): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const foundAuth = await AuthenticationCollection.findOne({ email });

     return Authentication.createFromPersistence(
       {
         _id: foundAuth._id.toString(),
         userId: foundAuth.userId.toString(),
         passwordHash: foundAuth.passwordHash,
         sessionToken: foundAuth.sessionToken,
         createdAt: foundAuth.createdAt,
       },
       hasher
     );
  }

  async create(
    authentication: Authentication
  ): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.entityToModel(authentication);
    const authData = {
      ...AuthenticationModel,
      _id: stringToObjectId(AuthenticationModel._id),
    };

    const newUserId = await AuthenticationCollection.insertOne(authData).then(
      (result: any) => result.insertedId
    );

    const createdAuthentication = await AuthenticationCollection.findOne({
      _id: newUserId,
    });

    if (createdAuthentication === null) {
      return null;
    }

    const hasher = authentication.hashService;

    return Authentication.createFromPersistence(
      {
        _id: createdAuthentication._id.toString(),
        userId: createdAuthentication.userId.toString(),
        passwordHash: createdAuthentication.passwordHash,
        sessionToken: createdAuthentication.sessionToken,
        createdAt: createdAuthentication.createdAt,
      },
      hasher
    );
  }

  async update(
    authentication: Authentication
  ): Promise<Authentication | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.entityToModel(authentication);
    const addreessId = AuthenticationModel._id;
    delete AuthenticationModel._id;
    const updatedAuthentication =
      await AuthenticationCollection.findOneAndUpdate(
        { _id: stringToObjectId(addreessId) },
        { $set: AuthenticationModel },
        { returnDocument: 'after' }
      );

    if (updatedAuthentication === null) {
      return null;
    }
    const hasher = authentication.hashService;
    return updatedAuthentication.createFromPersistence(
      {
        _id: updatedAuthentication._id.toString(),
        userId: updatedAuthentication.userId.toString(),
        passwordHash: updatedAuthentication.passwordHash,
        sessionToken: updatedAuthentication.sessionToken,
        createdAt: updatedAuthentication.createdAt,
      },
      hasher
    );
  }

  async delete(id: string): Promise<boolean> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const addreessId = new ObjectId(id);
    const deletedAuth = await AuthenticationCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAuth === null) {
      return false;
    }

    return true
  }
}
