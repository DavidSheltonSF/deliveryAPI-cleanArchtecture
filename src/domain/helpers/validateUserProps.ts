import { Either } from '../../shared/either';
import { userValidationErrorType } from '../errors/errorTypes';
import { Birthday, Cpf, Email, Name, Phone } from '../value-objects';

type UserValidation = {
  firstNameOrError: Either<Error, Name>;
  lastNameOrError: Either<Error, Name>;
  emailOrError: Either<Error, Email>;
  cpfOrError: Either<Error, Cpf>;
  phoneOrError: Either<Error, Phone>;
  birthdayOrError: Either<Error, Birthday>;
};

export function validateUserProps(
  validation: UserValidation
): Either<userValidationErrorType, null> {
  for (const value of Object.values(validation)) {
    if (value.isLeft()) {
      return Either.left(value.getLeft());
    }
  }
  return Either.right(null);
}
