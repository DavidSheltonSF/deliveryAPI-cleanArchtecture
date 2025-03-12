import { Either } from "../../../../shared/either";
import { InvalidPasswordError } from "../../../_errors/invalid-password";
import { Authentication as AuthenticationData} from "entities/validators/_interfaces";

export class Authentication {
  private readonly authentication: AuthenticationData;

  constructor(authentication: AuthenticationData){
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

  static create(authentication: AuthenticationData): Either<InvalidPasswordError, Authentication> {
    if (!this.validatePassword(authentication.password)) {
      return Either.left(new InvalidPasswordError(authentication.password));
    }

    return Either.right(new Authentication(authentication));
  }

  get(): AuthenticationData {
    return this.authentication;
  }
}