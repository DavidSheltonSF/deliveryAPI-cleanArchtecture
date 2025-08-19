import { Either } from '../../shared/either';
import { InvalidBirthdayError } from '../errors';
import { ValueObject } from './ValueObject';

export class Birthday extends ValueObject {
  private readonly value: Date;

  constructor(birthday: Date) {
    super();
    this.value = birthday;
    Object.freeze(this);
  }

  static validate(birthday: Date): boolean {
    if (birthday === undefined) {
      return false;
    }

    if (isNaN(birthday.getDate())) {
      return false;
    }

    return true;
  }

  static create(
    birthday: Date | string
  ): Either<InvalidBirthdayError, Birthday> {
    const parsedDate =
      typeof birthday === 'string' ? new Date(birthday) : birthday;

    if (!this.validate(parsedDate)) {
      return Either.left(new InvalidBirthdayError());
    }

    return Either.right(new Birthday(parsedDate));
  }

  static createFromPersistence(birthday: Date): Birthday {
    return new Birthday(birthday);
  }

  static createOptional(
    birthday: Date | string
  ): Either<InvalidBirthdayError, Birthday | undefined> {
    if (birthday === undefined) {
      return undefined;
    }
    const parsedDate =
      typeof birthday === 'string' ? new Date(birthday) : birthday;
    if (!this.validate(parsedDate)) {
      return undefined;
    }
    return Either.right(new Birthday(parsedDate));
  }

  getValue(): Date {
    return this.value;
  }
}
