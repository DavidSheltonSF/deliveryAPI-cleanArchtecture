import { Either } from './../../../shared/either';
import { InvalidRoleError } from '../errors';
import { UserRole } from './_enums';

export class Role {
  private readonly role: string;

  constructor(role: string) {
    this.role = role;
    Object.freeze(this);
  }

  static validate(role: string): Boolean {
    if (!Object.values(UserRole).includes(role as UserRole)) {
      return false;
    }

    return true;
  }

  static create(role: string): Either<InvalidRoleError, Role> {
    if (!this.validate(role)) {
      return Either.left(new InvalidRoleError(role));
    }

    return Either.right(new Role(role));
  }

  get(): string {
    return this.role;
  }
}
