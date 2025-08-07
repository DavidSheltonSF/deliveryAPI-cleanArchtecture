import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AuthenticationModel } from '../../models/mongodb/AuthenticationModel';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { Authentication } from '../../../domain/entities/Authentication';
import { AuthenticationRepository } from '../../../application/ports/AuthenticationRepository';

export class MongodbAuthenticationRepository implements AuthenticationRepository {
  async findById(id: string): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({
      _id: AuthenticationId,
    });
    return AuthenticationMapper.persistenceToModel(foundAuth);
  }

  async findByUserId(id: string): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const userId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({ userId });
    return AuthenticationMapper.persistenceToModel(foundAuth);
  }

  async findBySessionToken(token: string): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const foundAuth = await AuthenticationCollection.findOne({ sessionToken: token });
    return AuthenticationMapper.persistenceToModel(foundAuth);
  }

  async findByEmail(email: string): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const foundAuth = await AuthenticationCollection.findOne({ email });

    return AuthenticationMapper.persistenceToModel(foundAuth);
  }

  async create(
    Authentication: Authentication
  ): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.entityToModel(Authentication);
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

    return AuthenticationMapper.persistenceToModel(createdAuthentication);
  }

  async update(
    Authentication: Authentication
  ): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.entityToModel(Authentication);
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

    return AuthenticationMapper.persistenceToModel(updatedAuthentication);
  }

  async delete(id: string): Promise<AuthenticationModel | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const addreessId = new ObjectId(id);
    const deletedAuth = await AuthenticationCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAuth === null) {
      return null;
    }

    return AuthenticationMapper.persistenceToModel(deletedAuth);
  }
}
