import { Either } from "./../../../shared/either";
import { InvalidCpfError } from "./../_errors";

export class Cpf {
  private readonly cpf: string;

  constructor(cpf: string){
    this.cpf = cpf;
    Object.freeze(this);
  };

  static validate(cpf: string): Boolean{

    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;

    if(!cpf.match(cpfRegex)) {
      return false
    }
    
    return true;
  }

  static create(cpf: string): Either<InvalidCpfError, Cpf> {
    if (!this.validate(cpf)) {
      return Either.left(new InvalidCpfError(cpf));
    }

    return Either.right(new Cpf(cpf));
  }

  get(): string {
    return this.cpf;
  }
}