import { Either } from '../../shared/either';
import { InvalidAddressCityError } from '../errors';
import { ValueObject } from './ValueObject';

export class AddressCity extends ValueObject {
  private readonly value: string;

  constructor(city: string) {
    super();
    this.value = city;
    Object.freeze(this);
  }

  static validate(city: string): boolean {
    const cityRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    if (!city || city.trim().length < 2 || city.trim().length > 255) {
      return false;
    }

    if (!city.match(cityRegex)) {
      return false;
    }

    return true;
  }

  static create(city: string): Either<InvalidAddressCityError, AddressCity> {
    if (!this.validate(city)) {
      return Either.left(new InvalidAddressCityError(city));
    }

    return Either.right(new AddressCity(city));
  }

  getValue(): string {
    return this.value;
  }
}
