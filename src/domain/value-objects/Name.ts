import { Either } from '../../shared/either';
import { InvalidNameError } from '../errors';

export class Name {
  private readonly value: string;

  constructor(name: string) {
    this.value = name;
    Object.freeze(this);
  }

  static validate(name: string): boolean {
    const nameRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    if (!name.match(nameRegex)) {
      return false;
    }

    return true;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name)) {
      return Either.left(new InvalidNameError(name));
    }

    return Either.right(new Name(name));
  }

  getValue(): string {
    return this.value;
  }
}
