import { Either } from '../../shared/either';
import { InvalidNameError } from '../errors';
import { InvalidAddressStreetError } from '../errors/InvalidAddressStreetError';
import { ValueObject } from './ValueObject';

export class AddressStreet extends ValueObject {
  private readonly value: string;

  constructor(street: string) {
    super();
    this.value = street;
    Object.freeze(this);
  }

  static validate(street: string): boolean {
    if (!street || street.trim().length < 2 || street.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(
    street: string
  ): Either<InvalidAddressStreetError, AddressStreet> {
    if (!this.validate(street)) {
      return Either.left(new InvalidNameError(street));
    }

    return Either.right(new AddressStreet(street));
  }

  getValue(): string {
    return this.value;
  }
}
