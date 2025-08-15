import { HashService } from '../domain/contracts/HashService';
import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { authenticationErrorType } from '../domain/errors/errorTypes';
import { Password } from '../domain/value-objects';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';
import { Either } from '../shared/either';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';
import { WithId } from '../utils/types/WithId';

export class AuthenticationMapper {

  static propsToPersistence(auth: AuthenticationProps): AuthenticationModel {
    const { userId, passwordHash, sessionToken } = auth;

    return {
      userId,
      passwordHash: passwordHash.getValue(),
      sessionToken,
      createdAt: new Date(),
    };
  }
}
