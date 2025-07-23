import { Either } from '../../shared/either';
import { Comparer } from '../contracts/Comparer';
import { Hasher } from '../contracts/Hasher';
import { InvalidPasswordError } from '../errors';
import { MissingComparerError } from '../errors/MissingComparerError';
import { MissingHasherError } from '../errors/MissingHasherError';
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
    hasher: Hasher
  ): Promise<Either<InvalidPasswordError | MissingHasherError, PasswordHash>> {
    if (!hasher) {
      return Either.left(new MissingHasherError());
    }

    return Either.right(
      new PasswordHash(await hasher.hash(password.getValue()))
    );
  }

  async compare(
    password: Password,
    comparer: Comparer
  ): Promise<Either<MissingComparerError, boolean>> {
    if (!comparer) {
      return Either.left(new MissingComparerError());
    }
    return Either.right(
      await comparer.compare(password.getValue(), this.value)
    );
  }

  getValue(): string {
    return this.value;
  }
}
