import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { Either } from '../../shared/either';
import { AuthenticationProps } from '../entities/props/AuthenticationProps';
import { authenticationErrorType } from '../errors/errorTypes';
import { Email, Password, PasswordHash } from '../value-objects';
import { ValueObject } from '../value-objects/ValueObject';
import { validateEitherValues } from './validateEitherValues';

export function validateAuthentication(
  authenticationDTO: AuthenticationDTO,
  email: string
): Either<authenticationErrorType, AuthenticationProps> {
  const { password, sessionToken } = authenticationDTO;

  const validations = {
    email: Email.create(email),
    password: Password.create(password),
  };

  const validValuesOrError = validateEitherValues(validations);

  if (validValuesOrError.isLeft()) {
    return Either.left(validValuesOrError.getLeft());
  }

  const validValues = validValuesOrError.getRight();

  const authenticationProps: AuthenticationProps = {
    email: validValues.get('email') as Email,
    password: validValues.get('password') as Password,
    sessionToken,
  };

  return Either.right(authenticationProps);
}
