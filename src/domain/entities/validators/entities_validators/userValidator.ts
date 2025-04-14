import { User } from '../../user';
import { Either } from "../../../../shared/either";
import { 
  InvalidAddressError,
  InvalidCpfError,
  InvalidEmailError,
  InvalidNameError,
  InvalidPhoneError,
  InvalidRoleError,
  InvalidPaymentMethodError,
  InvalidCardNumberError,
  InvalidPasswordError
 } from "../../_errors";
import { 
  Name,
  Email,
  Phone,
  CpfValidator,
  AddressValidator,
  Role,
  BankInfoValidator,
  AuthenticationValidator
 } from "../fields_validators";

export class UserValidator {
  readonly username: Name;
  readonly email: Email;
  readonly phone: Phone;
  readonly cpf: CpfValidator;
  readonly role: Role;
  readonly bankInfo: BankInfoValidator;
  readonly address: AddressValidator;
  readonly authentication: AuthenticationValidator;

  private constructor(username: Name, email: Email, phone: Phone, cpf: CpfValidator, role: Role, address: AddressValidator, authentication: AuthenticationValidator, bankInfo?: BankInfoValidator | null) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.role = role;
    this.bankInfo = bankInfo;
    this.address = address;
    this.authentication = authentication;
    Object.freeze(this);
  };

  static create(userData: User): Either<InvalidAddressError 
  | InvalidCpfError
  | InvalidEmailError
  | InvalidNameError
  | InvalidPhoneError
  | InvalidRoleError
  | InvalidCardNumberError
  | InvalidPaymentMethodError
  | InvalidPasswordError, UserValidator> {

    const nameOrError = Name.create(userData.username);
    const emailOrError = Email.create(userData.email);
    const phoneOrError = Phone.create(userData.phone);
    const cpfOrError = CpfValidator.create(userData.cpf);
    const roleOrError = Role.create(userData.role);
    const AuthenticationOrError = AuthenticationValidator.create(userData.authentication);

    if(nameOrError.isLeft()) {
      console.log("Validation Error: Name");
      return Either.left(nameOrError.getLeft());
    }

    if(emailOrError.isLeft()) {
      console.log("Validation Error: Email");
      return Either.left(emailOrError.getLeft());
    }

    if(phoneOrError.isLeft()) {
      console.log("Validation Error: Phone");
      return Either.left(phoneOrError.getLeft());
    }

    if(cpfOrError.isLeft()) {
      console.log("Validation Error: CPF");
      return Either.left(cpfOrError.getLeft());
    }

    if(roleOrError.isLeft()) {
      console.log("Validation Error: Role");
      return Either.left(roleOrError.getLeft());
    }

    if(AuthenticationOrError.isLeft()) {
      console.log("Validation Error: Authentication");
      return Either.left(AuthenticationOrError.getLeft());
    }

    // Bank information is optional
    let bankInfo = null;
    if (userData.bankInfo){
      const bankInfoOrError = BankInfoValidator.create(userData.bankInfo);
      if(bankInfoOrError.isLeft()) {
        return Either.left(bankInfoOrError.getLeft());
      }
      bankInfo = bankInfoOrError.getRight();
    }

    // Address is optional
    let address = null;
    if (userData.address){
      console.log('ADREESSS')
      const addressOrError = AddressValidator.create(userData.address);
      if(addressOrError.isLeft()) {
        return Either.left(addressOrError.getLeft());
      }
      address = addressOrError.getRight();
    }

    return Either.right(new UserValidator(nameOrError.getRight(), emailOrError.getRight(), phoneOrError.getRight(), cpfOrError.getRight(), roleOrError.getRight(), address, AuthenticationOrError.getRight(), bankInfo));
  }
}