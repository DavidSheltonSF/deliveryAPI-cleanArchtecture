import { Either } from '../../../shared/either';
import { Comparer } from '../../contracts/Comparer';
import { Hasher } from '../../contracts/Hasher';
import { InvalidPasswordError } from '../errors';
import { MissingComparerError } from '../errors/MissingComparerError';
import { MissingHasherError } from '../errors/MissingHasherError';
import { Password } from './Password';

export class HashedPassword {
  private readonly hashedPassword: string;

  constructor(hashedPassword: string) {
    this.hashedPassword = hashedPassword;
    Object.freeze(this);
  }

  static async create(
    password: Password,
    hasher: Hasher
  ): Promise<
    Either<InvalidPasswordError | MissingHasherError, HashedPassword>
  > {
    if (!hasher) {
      return Either.left(new MissingHasherError());
    }

    return Either.right(new HashedPassword(await hasher.hash(password.get())));
  }

  async compare(
    password: Password,
    comparer: Comparer
  ): Promise<Either<MissingComparerError, boolean>> {
    if (!comparer) {
      return Either.left(new MissingComparerError());
    }
    return Either.right(
      await comparer.compare(password.get(), this.hashedPassword)
    );
  }

  get(): string {
    return this.hashedPassword;
  }
}
