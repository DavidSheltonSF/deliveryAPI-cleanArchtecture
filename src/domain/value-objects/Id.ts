import { Either } from '../../shared/either';
import { IdService } from '../contracts/IdService';
import { InvalidIdError } from '../errors';
import { ValueObject } from './ValueObject';

export class Id extends ValueObject {
  private readonly value: string;

  constructor(id: string) {
    super();
    this.value = id;
    Object.freeze(this);
  }

  static validate(id: string, idService: IdService): boolean {
    return idService.validate(id);
  }

  static create(id: string, idService: IdService): Either<InvalidIdError, Id> {
    if (!this.validate(id, idService)) {
      return Either.left(new InvalidIdError(id));
    }

    return Either.right(new Id(id));
  }

  getValue(): string {
    return this.value;
  }
}
