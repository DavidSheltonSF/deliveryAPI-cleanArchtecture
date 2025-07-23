import { Either } from '../../shared/either';
import { InvalidEmailError } from '../errors';
import { ValueObject } from './ValueObject';

export class Email extends ValueObject {
  private readonly value: string;

  constructor(email: string) {
    super();
    this.value = email;
    Object.freeze(this);
  }

  static validate(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || email.trim().length > 255) {
      return false;
    }

    if (!email.match(emailRegex)) {
      return false;
    }

    return true;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return Either.left(new InvalidEmailError(email));
    }

    return Either.right(new Email(email));
  }

  getValue(): string {
    return this.value;
  }
}
