import { Either } from '../../shared/either';
import { HashService } from '../contracts/HashService';
import { AuthenticationProps } from '../entities/props/AuthenticationProps';
import { RawAuthenticationProps } from '../entities/rawProps/RawAuthenticationProps';
import { authenticationErrorType } from '../errors/errorTypes';
import { Password } from '../value-objects';

export async function buildAuthenticationProps(
  authData: RawAuthenticationProps,
  hasher: HashService
): Promise<Either<authenticationErrorType, AuthenticationProps>> {
  const { password, sessionToken } = authData;

  const passwordOrError = await Password.create(password, hasher);

  if (passwordOrError.isLeft()) {
    return Either.left(passwordOrError.getLeft());
  }

  const authProps = {
    passwordHash: passwordOrError.getRight(),
    sessionToken,
  };

  return Either.right(authProps);
}
