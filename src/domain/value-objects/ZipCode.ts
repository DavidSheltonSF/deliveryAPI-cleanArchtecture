import { Either } from '../../shared/either';
import { InvalidAddressError } from '../errors/InvalidAddressError';
import { InvalidZipCodeError } from '../errors/InvalidZipCodeError';
import { ValueObject } from './ValueObject';

export class ZipCode extends ValueObject {
  private readonly value: string;

  constructor(zipCode: string) {
    super();
    this.value = zipCode;
    Object.freeze(this);
  }

  static validate(zipCode: string): Boolean {
    const zipCodeRegex = /^\d{8}$/;

    if (!zipCode.match(zipCodeRegex)) {
      return false;
    }

    return true;
  }

  static create(zipCode: string): Either<InvalidZipCodeError, ZipCode> {
    if (!this.validate(zipCode)) {
      return Either.left(new InvalidZipCodeError(zipCode));
    }

    return Either.right(new ZipCode(zipCode));
  }

  getValue(): string {
    return this.value;
  }
}
