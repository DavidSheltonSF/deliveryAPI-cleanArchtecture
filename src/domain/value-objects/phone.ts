import { Either } from '../../shared/either';
import { InvalidPhoneError } from '../entities/errors';

export class Phone {
  private readonly phone: string;

  constructor(phone: string) {
    this.phone = phone;
    Object.freeze(this);
  }

  static validate(phone: string): boolean {
    const phoneRegex = /^\d{2}\-?\d{9}$/;

    if (!phone.match(phoneRegex)) {
      return false;
    }

    return true;
  }

  static create(phone: string): Either<InvalidPhoneError, Phone> {
    if (!this.validate(phone)) {
      return Either.left(new InvalidPhoneError(phone));
    }

    return Either.right(new Phone(phone));
  }

  get(): string {
    return this.phone;
  }
}
