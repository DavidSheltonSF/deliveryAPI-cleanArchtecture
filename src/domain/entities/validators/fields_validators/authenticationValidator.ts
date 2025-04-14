import { Either } from "../../../../shared/either";
import { InvalidPasswordError } from "../../_errors/invalid-password";
import { Authentication } from "../_interfaces/index";

export class AuthenticationValidator {
  private readonly authentication: Authentication;

  constructor(authentication: Authentication){
    this.authentication = authentication;
    Object.freeze(this);
  };

  static validatePassword(password: string): Boolean{

    // At least 8 characters
    // A mix of uppercase and lowercase letters
    // At least one number
    // At least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(password.length > 250) {
      return false
    }

    if(!password.match(passwordRegex)) {
      return false
    }
    
    return true;
  }

  static create(authentication: Authentication): Either<InvalidPasswordError, AuthenticationValidator> {
    if (!this.validatePassword(authentication.password)) {
      return Either.left(new InvalidPasswordError(authentication.password));
    }

    return Either.right(new AuthenticationValidator(authentication));
  }

  get(): Authentication {
    return this.authentication;
  }
}