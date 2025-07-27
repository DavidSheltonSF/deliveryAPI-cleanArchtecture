import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { authenticationErrorType } from '../../domain/errors/errorTypes';
import { Either } from '../../shared/either';
import { FieldsValidator } from './FieldsValidator';

export function validateAuthentication(
  authentication: AuthenticationDTO
): Either<authenticationErrorType, null> {
  const { password } = authentication;

  const validation = FieldsValidator.validateFields({ password });
  if (validation.isLeft()) {
    return Either.left(validation.getLeft());
  }

  return null;
}
