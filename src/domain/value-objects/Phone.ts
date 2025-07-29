import { Either } from '../../shared/either';
import { InvalidPhoneError } from '../errors';
import { ValueObject } from './ValueObject';

export class Phone extends ValueObject {
  private readonly value: string;

  constructor(phoneNumber: string) {
    super();
    this.value = phoneNumber;
    Object.freeze(this);
  }

  static validate(phoneNumber: string): boolean {
    const phoneRegex = /^\d{2}\-?\d{9}$/;

    if (!phoneNumber.match(phoneRegex)) {
      return false;
    }

    return true;
  }

  static create(phoneNumber: string): Either<InvalidPhoneError, Phone> {
    if (!this.validate(phoneNumber)) {
      return Either.left(new InvalidPhoneError(phoneNumber));
    }

    return Either.right(new Phone(phoneNumber));
  }

  static createFromPersistence(phoneNumber: string): Phone {
    return new Phone(phoneNumber);
  }

  getValue(): string {
    return this.value;
  }
}
