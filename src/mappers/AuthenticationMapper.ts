import { Document, WithId } from 'mongodb';
import { HashService } from '../domain/contracts/HashService';
import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { authenticationErrorType } from '../domain/errors/errorTypes';
import { Password } from '../domain/value-objects';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';
import { Either } from '../shared/either';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';
import { Authentication } from '../domain/entities/Authentication';

export class AuthenticationMapper {
  static async rawToProps(
    authenticationDTO: AuthenticationDTO,
    hashService: HashService
  ): Promise<Either<authenticationErrorType, AuthenticationProps>> {
    const { password, sessionToken } = authenticationDTO;

    const passwordHashOrError = await Password.create(password, hashService);
    if (passwordHashOrError.isLeft()) {
      return Either.left(passwordHashOrError.getLeft());
    }

    const passwordHash = passwordHashOrError.getRight();
    const authenticationProps = {
      passwordHash,
      sessionToken: sessionToken,
    };

    return Either.right(authenticationProps);
  }

  static persistenceToModel(
    document: WithId<Document>
  ): AuthenticationModel {
    if (document === null) {
      throw Error('No document provided from persistence.');
    }

    return {
      _id: document._id.toString(),
      userId: document.userId.toString(),
      passwordHash: document.passwordHash,
      sessionToken: document.sessionToken,
      createdAt: document.createdAt,
    };
  }

  static entityToModel(
    authentication: Authentication
  ): AuthenticationModel {
    if (authentication === null) {
      throw Error('No entity provided.');
    }

    return {
      _id: authentication.id,
      userId: authentication.userId,
      passwordHash: authentication.passwordHash,
      sessionToken: authentication.sessionToken,
      createdAt: authentication.createdAt,
    };
  }
}
