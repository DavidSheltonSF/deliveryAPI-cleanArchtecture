import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { AuthenticationRepository } from '../../../application/ports/AuthenticationRepository';
import { HashService } from '../../../domain/contracts/HashService';
import { AuthenticationProps } from '../../../domain/entities/props/AuthenticationProps';
import { WithId } from '../../../utils/types/WithId';

export class MongodbAuthenticationRepository {
  //implements AuthenticationRepository
  async findById(id: string): Promise<WithId<AuthenticationProps> | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({
      _id: AuthenticationId,
    });
    return AuthenticationMapper.persistenceToProps({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  async findByUserId(id: string): Promise<WithId<AuthenticationProps> | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const userId = new ObjectId(id);
    const foundAuth = await AuthenticationCollection.findOne({
      userId,
    });
    return AuthenticationMapper.persistenceToProps({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  // async findBySessionToken(token: string, hasher: HashService): Promise<Authentication | null> {
  //   const AuthenticationCollection =
  //     mongoHelper.getCollection('authentications');
  //   const foundAuth = await AuthenticationCollection.findOne({
  //     sessionToken: token,
  //   });
  //    return Authentication.createFromPersistence(
  //      {
  //        _id: foundAuth._id.toString(),
  //        userId: foundAuth.userId.toString(),
  //        passwordHash: foundAuth.passwordHash,
  //        sessionToken: foundAuth.sessionToken,
  //        createdAt: foundAuth.createdAt,
  //      },
  //      hasher
  //    );
  // }

  // async findByEmail(email: string, hasher: HashService): Promise<Authentication | null> {
  //   const AuthenticationCollection =
  //     mongoHelper.getCollection('authentications');
  //   const foundAuth = await AuthenticationCollection.findOne({ email });

  //    return Authentication.createFromPersistence(
  //      {
  //        _id: foundAuth._id.toString(),
  //        userId: foundAuth.userId.toString(),
  //        passwordHash: foundAuth.passwordHash,
  //        sessionToken: foundAuth.sessionToken,
  //        createdAt: foundAuth.createdAt,
  //      },
  //      hasher
  //    );
  // }

  async create(
    authentication: AuthenticationProps
  ): Promise<WithId<AuthenticationProps> | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.propsToPersistence(authentication);

    const id = await AuthenticationCollection.insertOne(
      AuthenticationModel
    ).then((result: any) => result.insertedId);

    const createdAuthentication = await AuthenticationCollection.findOne({
      _id: id,
    });

    if (createdAuthentication === null) {
      return null;
    }

    return AuthenticationMapper.persistenceToProps({
      id: createdAuthentication._id.toString(),
      userId: createdAuthentication.userId.toString(),
      passwordHash: createdAuthentication.passwordHash,
      sessionToken: createdAuthentication.sessionToken,
      createdAt: createdAuthentication.createdAt,
    });
  }

  async update(
    id: string,
    authentication: AuthenticationProps
  ): Promise<AuthenticationProps | null> {
    const AuthenticationCollection =
      mongoHelper.getCollection('authentications');
    const AuthenticationModel =
      AuthenticationMapper.propsToPersistence(authentication);
    const updatedAuthentication =
      await AuthenticationCollection.findOneAndUpdate(
        { _id: stringToObjectId(id) },
        { $set: AuthenticationModel },
        { returnDocument: 'after' }
      );

    if (updatedAuthentication === null) {
      return null;
    }

    return AuthenticationMapper.persistenceToProps({
      id: updatedAuthentication._id.toString(),
      userId: updatedAuthentication.userId.toString(),
      passwordHash: updatedAuthentication.passwordHash,
      sessionToken: updatedAuthentication.sessionToken,
      createdAt: updatedAuthentication.createdAt,
    });
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

    return true;
  }
}
