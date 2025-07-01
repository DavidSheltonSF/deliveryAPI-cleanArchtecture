import { Either } from '../../shared/either';
import { InvalidUserNameError } from '../entities/errors';

export class UserName {
  private readonly username: string;

  constructor(username: string) {
    this.username = username;
    Object.freeze(this);
  }

  static validate(username: string): Boolean {
    const usernameRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    if (
      !username ||
      username.trim().length < 2 ||
      username.trim().length > 255
    ) {
      return false;
    }

    if (!username.match(usernameRegex)) {
      return false;
    }

    return true;
  }

  static create(username: string): Either<InvalidUserNameError, UserName> {
    if (!this.validate(username)) {
      return Either.left(new InvalidUserNameError(username));
    }

    return Either.right(new UserName(username));
  }

  get(): string {
    return this.username;
  }
}
