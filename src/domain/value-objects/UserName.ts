import { Either } from '../../shared/either';
import { InvalidUserNameError } from '../errors';
import { ValueObject } from './ValueObject';

export class UserName extends ValueObject {
  private readonly value: string;

  constructor(username: string) {
    super();
    this.value = username;
    Object.freeze(this);
  }

  static validate(username: string): boolean {
    if (
      !username ||
      username.trim().length < 2 ||
      username.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  static create(username: string): Either<any, any> {
    if (!this.validate(username)) {
      return Either.left(new InvalidUserNameError(username));
    }

    return Either.right(new UserName(username));
  }

  getValue(): any {
    return this.value;
  }
}
