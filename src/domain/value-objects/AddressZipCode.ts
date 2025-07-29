import { Either } from '../../shared/either';
import { InvalidAddressZipCodeError } from '../errors';
import { ValueObject } from './ValueObject';

export class AddressZipCode extends ValueObject {
  private readonly value: string;

  constructor(zipCode: string) {
    super();
    this.value = zipCode;
    Object.freeze(this);
  }

  static validate(zipCode: string): Boolean {
    if (zipCode === undefined) {
      return false;
    }

    const zipCodeRegex = /^\d{8}$/;

    if (!zipCode.match(zipCodeRegex)) {
      return false;
    }

    return true;
  }

  static create(
    zipCode: string
  ): Either<InvalidAddressZipCodeError, AddressZipCode> {
    if (!this.validate(zipCode)) {
      return Either.left(new InvalidAddressZipCodeError(zipCode));
    }

    return Either.right(new AddressZipCode(zipCode));
  }

  static createFromPersistence(zipCode: string): AddressZipCode {
    return new AddressZipCode(zipCode);
  }

  getValue(): string {
    return this.value;
  }
}
