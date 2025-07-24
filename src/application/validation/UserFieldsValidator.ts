import { userValidationErrorType } from '../../domain/errors/errorTypes';
import {
  Birthday,
  Cpf,
  Email,
  Name,
  Password,
  Phone,
  Role,
  UserName,
  AddressStreet,
  AddressCity,
  AddressState,
  AddressZipCode,
} from '../../domain/value-objects';
import { ValueObject } from '../../domain/value-objects/ValueObject';
import { Either } from '../../shared/either';
import { NotMappedFieldError } from '../_errors/NotMappedFieldError';

export class UserFieldsValidator {
  private static readonly valueObjects = {
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    phone: Phone,
    role: Role,
    birthday: Birthday,
    addressStreet: AddressStreet,
    addressCity: AddressCity,
    addressState: AddressState,
    addressZipCode: AddressZipCode,
    password: Password,
  };

  static fieldIsRecognized(field: string): boolean {
    return field in this.valueObjects;
  }

  static validateOne(key: string, value: any): Either<Error, null> {
    const errorOrValue = this.valueObjects[key].create(value) as Either<
      any,
      ValueObject
    >;
    if (errorOrValue.isLeft()) {
      return Either.left(errorOrValue.getLeft());
    }

    return Either.right(null);
  }

  static validateFields(
    fields: Record<string, any>
  ): Either<NotMappedFieldError | userValidationErrorType, null> {
    for (const [k, v] of Object.entries(fields)) {
      if (!this.fieldIsRecognized(k)) {
        return Either.left(new NotMappedFieldError(k));
      }
      const validFieldOrError = this.validateOne(k, v);
      if (validFieldOrError.isLeft()) {
        return Either.left(validFieldOrError.getLeft());
      }
    }
    return Either.right(null);
  }
}
