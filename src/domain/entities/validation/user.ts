import { UserProps } from '../user-props';
import { Either } from "./../../../shared/either";
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
 } from "./../_errors";
import { 
  Name,
  Email,
  Phone,
  Cpf,
  Address,
  Role,
  BankInfo,
  Authentication
 } from "./";

export class User {
  readonly username: Name;
  readonly email: Email;
  readonly phone: Phone;
  readonly cpf: Cpf;
  readonly role: Role;
  readonly bankInfo: BankInfo;
  readonly address: Address;
  readonly authentication: Authentication;

  private constructor(username: Name, email: Email, phone: Phone, cpf: Cpf, role: Role, address: Address, authentication: Authentication, bankInfo?: BankInfo | null) {
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

  static create(userData: Omit<UserProps, "_id">): Either<InvalidAddressError 
  | InvalidCpfError
  | InvalidEmailError
  | InvalidNameError
  | InvalidPhoneError
  | InvalidRoleError
  | InvalidCardNumberError
  | InvalidPaymentMethodError
  | InvalidPasswordError, User> {

    const nameOrError = Name.create(userData.username);
    const emailOrError = Email.create(userData.email);
    const phoneOrError = Phone.create(userData.phone);
    const cpfOrError = Cpf.create(userData.cpf);
    const roleOrError = Role.create(userData.role);
    const authenticationOrError = Authentication.create(userData.authentication);

    if(nameOrError.isLeft()) {
      return Either.left(nameOrError.getLeft());
    }

    if(emailOrError.isLeft()) {
      return Either.left(emailOrError.getLeft());
    }

    if(phoneOrError.isLeft()) {
      return Either.left(phoneOrError.getLeft());
    }

    if(cpfOrError.isLeft()) {
      return Either.left(cpfOrError.getLeft());
    }

    if(roleOrError.isLeft()) {
      return Either.left(roleOrError.getLeft());
    }

    if(authenticationOrError.isLeft()) {
      return Either.left(authenticationOrError.getLeft());
    }

    // Bank information is optional
    let bankInfo = null;
    if (userData.bankInfo){
      const bankInfoOrError = BankInfo.create(userData.bankInfo);
      if(bankInfoOrError.isLeft()) {
        return Either.left(bankInfoOrError.getLeft());
      }
      bankInfo = bankInfoOrError.getRight();
    }

    // Address is optional
    let address = null;
    if (userData.address){
      const addressOrError = Address.create(userData.address);
      if(addressOrError.isLeft()) {
        return Either.left(addressOrError.getLeft());
      }
      address = addressOrError.getRight();
    }

    return Either.right(new User(nameOrError.getRight(), emailOrError.getRight(), phoneOrError.getRight(), cpfOrError.getRight(), roleOrError.getRight(), address, authenticationOrError.getRight(), bankInfo));
  }
}