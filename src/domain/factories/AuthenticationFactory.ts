import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { Either } from '../../shared/either';
import { Authentication } from '../entities/authentication/Authentication';
import { authenticationErrorType } from '../errors/errorTypes';
import { validateAuthentication } from '../helpers/validateAuthentication';

export class AuthenticationFactory {
  static create(
    authenticationDTO: AuthenticationDTO,
    userEmail: string
  ): Either<authenticationErrorType, Authentication> {
    const authenticationOrError = validateAuthentication(
      authenticationDTO,
      userEmail
    );

    if (authenticationOrError.isLeft()) {
      return Either.left(authenticationOrError.getLeft());
    }

    const validAuthentication = authenticationOrError.getRight();

    const authenticationEntity = new Authentication(
      validAuthentication.get('email').getValue(),
      validAuthentication.get('password').getValue(),
      authenticationDTO.sessionToken
    );

    return Either.right(authenticationEntity);
  }
}
