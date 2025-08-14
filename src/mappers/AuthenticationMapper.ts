import { HashService } from '../domain/contracts/HashService';
import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { authenticationErrorType } from '../domain/errors/errorTypes';
import { Password } from '../domain/value-objects';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';
import { Either } from '../shared/either';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';
import { WithId } from '../utils/types/WithId';

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

  static propsToPersistence(auth: AuthenticationProps): AuthenticationModel {
    const { userId, passwordHash, sessionToken } = auth;

    return {
      userId,
      passwordHash: passwordHash.getValue(),
      sessionToken,
      createdAt: new Date(),
    };
  }

  static persistenceToProps(
    auth: WithId<AuthenticationModel>
  ): WithId<AuthenticationProps> {
    const { id, userId, passwordHash, sessionToken } = auth;

    return {
      id,
      userId,
      passwordHash: Password.createFromPersistence(passwordHash),
      sessionToken,
    };
  }
}
