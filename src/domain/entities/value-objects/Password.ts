import { Either } from '../../../shared/either';
import { InvalidPasswordError } from '../errors';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    this.password = password;
    Object.freeze(this);
  }

  static validate(password: string): boolean {
    // At least 8 characters
    // A mix of uppercase and lowercase letters
    // At least one number
    // At least one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password || password.length > 250) {
      return false;
    }

    if (!password.match(passwordRegex)) {
      return false;
    }

    return true;
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!this.validate(password)) {
      return Either.left(new InvalidPasswordError(password));
    }

    return Either.right(new Password(password));
  }

  get(): string {
    return this.password;
  }
}
