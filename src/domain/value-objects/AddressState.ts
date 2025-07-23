import { Either } from '../../shared/either';
import { InvalidAddressStateError } from '../errors';
import { ValueObject } from './ValueObject';

export class AddressState extends ValueObject {
  private readonly value: string;

  constructor(state: string) {
    super();
    this.value = state;
    Object.freeze(this);
  }

  static validate(state: string): boolean {
    const stateRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    if (!state || state.trim().length < 2 || state.trim().length > 255) {
      return false;
    }

    if (!state.match(stateRegex)) {
      return false;
    }

    return true;
  }

  static create(state: string): Either<InvalidAddressStateError, AddressState> {
    if (!this.validate(state)) {
      return Either.left(new InvalidAddressStateError(state));
    }

    return Either.right(new AddressState(state));
  }

  getValue(): string {
    return this.value;
  }
}
