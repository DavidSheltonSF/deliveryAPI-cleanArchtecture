import { Hasher } from '../domain/contracts/Hasher';
import { AuthenticationProps } from '../domain/entities/authentication/AuthenticationProps';
import { InvalidEmailError, InvalidPasswordError } from '../domain/errors';
import { Email, Password, PasswordHash } from '../domain/value-objects';
import { AuthenticationDTO } from '../presentation/dtos/UserDTO';
import { Either } from '../shared/either';

export async function rawAuthenticationToProps(
  authenticationDTO: AuthenticationDTO,
  userEmail: string,
  hasher: Hasher
): Promise<
  Either<InvalidPasswordError | InvalidEmailError, AuthenticationProps>
> {
  const { password, sessionToken } = authenticationDTO;

  const passwordOrError = Password.create(password);
  const emailOrError = Email.create(userEmail);

  if (passwordOrError.isLeft()) {
    return Either.left(passwordOrError.getLeft());
  }

  if (emailOrError.isLeft()) {
    return Either.left(emailOrError.getLeft());
  }

  const validPassword = passwordOrError.getRight();

  const passwordHash = await PasswordHash.create(validPassword, hasher);

  if (passwordHash.isLeft()) {
    return Either.left(passwordHash.getLeft());
  }

  const validPasswordHash = passwordHash.getRight();

  const authenticationProps: AuthenticationProps = {
    passwordHash: validPasswordHash.get(),
    sessionToken,
  };

  return Either.right(authenticationProps);
}
