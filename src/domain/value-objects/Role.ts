import { Either } from '../../shared/either';
import { InvalidRoleError } from '../errors';
import { UserRole } from './_enums';
import { ValueObject } from './ValueObject';

export class Role extends ValueObject {
  private readonly value: string;

  constructor(role: string) {
    super();
    this.value = role;
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

  getValue(): string {
    return this.value;
  }
}
