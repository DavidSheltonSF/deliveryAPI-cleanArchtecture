import { ObjectId } from 'mongodb';
import { mongoHelper } from './helpers/mongo-helper';
import { stringToObjectId } from './helpers/stringToObjectId';
import { AuthenticationMapper } from '../../../mappers/AuthenticationMapper';
import { AuthenticationFactory } from '../../../factories/AuthenticationFactory';
import { AuthenticationRepository } from '../../../application/ports/AuthenticationRepository';
import { AuthenticationProps } from '../../../domain/entities/props/AuthenticationProps';
import { WithId } from '../../../utils/types/WithId';
import { entityCollectionMap } from './helpers/entityCollectionMap';

export class MongodbAuthenticationRepository
  implements AuthenticationRepository
{
  private readonly authCollection = mongoHelper.getCollection(
    entityCollectionMap.authentication
  );

  async findById(id: string): Promise<WithId<AuthenticationProps> | null> {
    const AuthenticationId = new ObjectId(id);
    const foundAuth = await this.authCollection.findOne({
      _id: AuthenticationId,
    });
    return AuthenticationFactory.createFromPersistence({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  async findByUserId(id: string): Promise<WithId<AuthenticationProps> | null> {
    const userId = new ObjectId(id);
    const foundAuth = await this.authCollection.findOne({
      userId,
    });
    return AuthenticationFactory.createFromPersistence({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  async findBySessionToken(
    token: string
  ): Promise<WithId<AuthenticationProps> | null> {
    const foundAuth = await this.authCollection.findOne({
      sessionToken: token,
    });
    return AuthenticationFactory.createFromPersistence({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  async findByEmail(
    email: string
  ): Promise<WithId<AuthenticationProps> | null> {
    const foundAuth = await this.authCollection.findOne({
      email,
    });
    return AuthenticationFactory.createFromPersistence({
      id: foundAuth._id.toString(),
      userId: foundAuth.userId.toString(),
      passwordHash: foundAuth.passwordHash,
      sessionToken: foundAuth.sessionToken,
      createdAt: foundAuth.createdAt,
    });
  }

  async create(
    authentication: AuthenticationProps
  ): Promise<WithId<AuthenticationProps> | null> {
    const AuthenticationModel =
      AuthenticationMapper.propsToPersistence(authentication);

    const id = await this.authCollection
      .insertOne(AuthenticationModel)
      .then((result: any) => result.insertedId);

    const createdAuthentication = await this.authCollection.findOne({
      _id: id,
    });

    if (createdAuthentication === null) {
      return null;
    }

    return AuthenticationFactory.createFromPersistence({
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
    const AuthenticationModel =
      AuthenticationMapper.propsToPersistence(authentication);
    const updatedAuthentication = await this.authCollection.findOneAndUpdate(
      { _id: stringToObjectId(id) },
      { $set: AuthenticationModel },
      { returnDocument: 'after' }
    );

    if (updatedAuthentication === null) {
      return null;
    }

    return AuthenticationFactory.createFromPersistence({
      id: updatedAuthentication._id.toString(),
      userId: updatedAuthentication.userId.toString(),
      passwordHash: updatedAuthentication.passwordHash,
      sessionToken: updatedAuthentication.sessionToken,
      createdAt: updatedAuthentication.createdAt,
    });
  }

  async delete(id: string): Promise<boolean> {
    const addreessId = new ObjectId(id);
    const deletedAuth = await this.authCollection.findOneAndDelete({
      _id: addreessId,
    });

    if (deletedAuth === null) {
      return false;
    }

    return true;
  }
}
