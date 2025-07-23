import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { Either } from '../../shared/either';
import { Hasher } from '../contracts/Hasher';
import { Authentication } from '../entities/Authentication';
import { authenticationErrorType } from '../errors/errorTypes';
import { validateAuthentication } from '../helpers/validateAuthentication';

export class AuthenticationFactory {
  static async create(
    authenticationDTO: AuthenticationDTO,
    email: string,
    hasher: Hasher
  ): Promise<Either<authenticationErrorType, Authentication>> {
    const authenticationOrError = validateAuthentication(
      authenticationDTO,
      email
    );

    if (authenticationOrError.isLeft()) {
      return Either.left(authenticationOrError.getLeft());
    }

    const validAuthentication = authenticationOrError.getRight();

    const passwordHash = await hasher.hash(
      validAuthentication.get('password').getValue()
    );

    const authenticationEntity = new Authentication(
      validAuthentication.get('email').getValue(),
      passwordHash,
      authenticationDTO.sessionToken
    );

    return Either.right(authenticationEntity);
  }
}
