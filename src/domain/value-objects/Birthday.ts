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

  static create(birthday: Date): Either<InvalidBirthdayError, Birthday> {
    if (!this.validate(birthday)) {
      return Either.left(
        new InvalidBirthdayError(birthday.toLocaleDateString())
      );
    }

    return Either.right(new Birthday(birthday));
  }

  get(): Date {
    return this.birthday;
  }

  getAge(): number {
    const currentYear = new Date().getFullYear();
    const birthDayYear = this.birthday.getFullYear();
    return currentYear - birthDayYear;
  }
}
