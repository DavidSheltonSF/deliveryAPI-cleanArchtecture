import { Either } from '../../shared/either';
import { InvalidCpfError } from '../errors';
import { ValueObject } from './ValueObject';

export class Cpf extends ValueObject {
  private readonly value: string;

  constructor(cpf: string) {
    super();
    this.value = cpf;
    Object.freeze(this);
  }

  static validate(cpf: string): boolean {
    if (cpf === undefined) {
      return false;
    }

    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;

    if (!cpf.match(cpfRegex)) {
      return false;
    }

    return true;
  }

  static create(cpf: string): Either<InvalidCpfError, Cpf> {
    if (!this.validate(cpf)) {
      return Either.left(new InvalidCpfError(cpf));
    }

    return Either.right(new Cpf(cpf));
  }

  static createFromPersistence(cpf: string): Cpf {
    return new Cpf(cpf);
  }

  static createOptional(cpf: string): Either<InvalidCpfError, Cpf | undefined> {
    if (cpf === undefined) {
      return undefined;
    }
    if (!this.validate(cpf)) {
      return Either.left(new InvalidCpfError(cpf));
    }
    return Either.right(new Cpf(cpf));
  }

  getValue(): string {
    return this.value;
  }
}
