import { Either } from '../shared/either';
import {
  addressErrorType,
  userValidationErrorType,
} from '../domain/errors/errorTypes';
import { ValueObject } from '../domain/value-objects/ValueObject';

export function validateEitherValues(
  validations: Record<string, Either<any, any>>
): Either<
  userValidationErrorType | addressErrorType,
  Map<string, ValueObject>
> {
  const validValues: Map<string, ValueObject> = new Map();

  for (const [k, v] of Object.entries(validations)) {
    if (v.isLeft()) {
      return Either.left(v.getLeft());
    }
    validValues.set(k, v.getRight());
  }

  return Either.right(validValues);
}
