import { Either } from '../../shared/either';

export abstract class ValueObject {
  readonly value: any;

  create(value: any): Either<any, any> {
    throw Error('Use a subclass.');
  }
  getValue() {
    throw Error('Use a subclass.');
  }
}
