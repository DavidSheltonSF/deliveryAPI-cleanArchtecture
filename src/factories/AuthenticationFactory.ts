import { HashService } from '../domain/contracts/HashService';
import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { authenticationErrorType } from '../domain/errors/errorTypes';
import { Password } from '../domain/value-objects';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';
import { Either } from '../shared/either';
import { WithId } from '../utils/types/WithId';

export class AuthenticationFactory {
  static async create(
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

  static createFromPersistence(
    data: WithId<AuthenticationModel>
  ): WithId<AuthenticationProps> {
    const { id, userId, passwordHash, sessionToken } = data;

    const address = {
      id,
      userId,
      passwordHash: Password.createFromPersistence(passwordHash),
      sessionToken,
    };

    return address;
  }
}
