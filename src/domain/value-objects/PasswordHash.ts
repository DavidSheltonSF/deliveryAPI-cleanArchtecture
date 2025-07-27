import { Either } from '../../shared/either';
import { HashService } from '../contracts/HashService';
import { HashService } from '../contracts/HashService';
import { InvalidPasswordError } from '../errors';
import { MissingHashServiceError } from '../errors/MissingHashServiceError';
import { MissingHashServiceError } from '../errors/MissingHashServiceError';
import { Password } from './Password';
import { ValueObject } from './ValueObject';

export class PasswordHash extends ValueObject {
  private readonly value: string;

  constructor(passwordHash: string) {
    super();
    this.value = passwordHash;
    Object.freeze(this);
  }

  static async create(
    password: Password,
    hasher: HashService
  ): Promise<
    Either<InvalidPasswordError | MissingHashServiceError, PasswordHash>
  > {
    if (!hasher) {
      return Either.left(new MissingHashServiceError());
    }

    return Either.right(
      new PasswordHash(await hasher.hash(password.getValue()))
    );
  }

  async compare(
    password: Password,
    hashservice: HashService
  ): Promise<Either<MissingHashServiceError, boolean>> {
    if (!hashservice) {
      return Either.left(new MissingHashServiceError());
    }
    return Either.right(
      await hashservice.compare(password.getValue(), this.value)
    );
  }

  getValue(): string {
    return this.value;
  }
}
