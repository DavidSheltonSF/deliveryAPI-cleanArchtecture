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
      return Either.left(
        new InvalidBirthdayError(parsedDate.toLocaleDateString())
      );
    }

    return Either.right(new Birthday(parsedDate));
  }

  static createFromPersistence(birthday: Date): Birthday {
    return new Birthday(birthday);
  }

  getValue(): Date {
    return this.value;
  }
}
