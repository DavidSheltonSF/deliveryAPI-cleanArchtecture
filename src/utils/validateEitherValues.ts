import { Either } from '../shared/either';

export function validateEitherValues(
  validations: Either<any, any>[]
): Either<Error, boolean> {
  for (const validation of validations) {
    if (validation.isLeft()) {
      return Either.left(validation.getLeft());
    }
  }
  return Either.right(true);
}
