import { Either } from "../../shared/either";
import { InvalidNameError } from "../_errors/invalid-name";

export class Name {
  private readonly name: string;

  constructor(name: string){
    this.name = name;
    Object.freeze(this);
  };

  static validate(name: string): Boolean{

    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name)) {
      return Either.left(new InvalidNameError(this.name));
    }

    return Either.right(new Name(this.name));
  }

  get(): string {
    return this.name;
  }

  
}