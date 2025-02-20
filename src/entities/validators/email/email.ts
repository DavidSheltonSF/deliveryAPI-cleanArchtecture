import { Either } from "../../../shared/either";
import { InvalidEmailError } from "../../_errors/invalid-email";

export class Email {
  private readonly email: string;

  constructor(email: string){
    this.email = email;
    Object.freeze(this);
  };

  static validate(email: string): Boolean{

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim().length > 255) {
      return false;
    }

    if(!email.match(emailRegex)) {
      return false
    }
    
    return true;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return Either.left(new InvalidEmailError(email));
    }

    return Either.right(new Email(email));
  }

  get(): string {
    return this.email;
  }
}