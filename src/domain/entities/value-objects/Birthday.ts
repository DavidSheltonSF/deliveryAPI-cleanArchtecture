import { Either } from '../../../shared/either';
import { InvalidBirthdayError } from '../errors';

export class Birthday {
  private readonly birthday: string;

  constructor(birthday: string) {
    this.birthday = birthday;
    Object.freeze(this);
  }

  static validate(birthday: string): boolean {
    const birthDayDate = new Date(birthday);

    if (isNaN(birthDayDate.getDate())) {
      return false;
    }

    return true;
  }

  static create(birthday: string): Either<InvalidBirthdayError, Birthday> {
    if (!this.validate(birthday)) {
      return Either.left(new InvalidBirthdayError(birthday));
    }

    return Either.right(new Birthday(birthday));
  }

  get(): string {
    return this.birthday;
  }

  getAge(): number {
    const currentYear = new Date().getFullYear();
    const birthDayYear = new Date(this.birthday).getFullYear();
    return currentYear - birthDayYear;
  }
}
