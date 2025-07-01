import { Either } from '../../shared/either';
import { InvalidAddressError } from '../errors/InvalidAddressError';

export class ZipCode {
  private readonly zipCode: string;

  constructor(zipCode: string) {
    this.zipCode = zipCode;
    Object.freeze(this);
  }

  static validate(zipCode: string): Boolean {
    const zipCodeRegex = /^\d{8}$/;

    if (!zipCode.match(zipCodeRegex)) {
      return false;
    }

    return true;
  }

  static create(zipCode: string): Either<InvalidAddressError, ZipCode> {
    if (!this.validate(zipCode)) {
      return Either.left(new InvalidAddressError(zipCode));
    }

    return Either.right(new ZipCode(zipCode));
  }

  get(): string {
    return this.zipCode;
  }
}
