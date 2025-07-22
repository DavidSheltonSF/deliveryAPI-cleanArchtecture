import { Either } from '../../shared/either';
import { InvalidBirthdayError } from '../errors';

export class Birthday {
  private readonly birthday: Date;

  constructor(birthday: Date) {
    this.birthday = birthday;
    Object.freeze(this);
  }

  static validate(birthday: Date): boolean {
    if (isNaN(birthday.getDate())) {
      return false;
    }

    return true;
  }

  static create(date: Date | string): Either<InvalidBirthdayError, Birthday> {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (!this.validate(parsedDate)) {
      return Either.left(
        new InvalidBirthdayError(parsedDate.toLocaleDateString())
      );
    }

    return Either.right(new Birthday(parsedDate));
  }

  get(): Date {
    return this.birthday;
  }
}
