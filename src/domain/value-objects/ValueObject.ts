import { Either } from '../../shared/either';

export interface ValueObject {
  readonly value: any;

  validate(value: any): boolean;
  create(value: any): Either<any, any>;
  getValue(): any;
}
