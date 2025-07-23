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

  static create(birthday: Date): Either<InvalidBirthdayError, Birthday> {
    if (!this.validate(birthday)) {
      return Either.left(
        new InvalidBirthdayError(birthday.toLocaleDateString())
      );
    }

    return Either.right(new Birthday(birthday));
  }

  getValue(): Date {
    return this.value;
  }
}
