import { UserProps } from '../user-props';
import { Either } from './../../../shared/either';
import {
  InvalidAddressError,
  InvalidCpfError,
  InvalidEmailError,
  InvalidNameError,
  InvalidPhoneError,
  InvalidRoleError,
  InvalidPaymentMethodError,
  InvalidCardNumberError,
  InvalidPasswordError,
} from '../errors';
import {
  Name,
  Email,
  Phone,
  Cpf,
  Address,
  Role,
  BankInfo,
  Authentication,
} from './';

export class User {
  readonly username: Name;
  readonly email: Email;
  readonly phone: Phone;
  readonly cpf: Cpf;
  readonly role: Role;
  readonly bankInfo: BankInfo;
  readonly address: Address;
  readonly authentication: Authentication;

  private constructor(
    username: Name,
    email: Email,
    phone: Phone,
    cpf: Cpf,
    role: Role,
    authentication: Authentication,
    address?: Address | undefined,
    bankInfo?: BankInfo | undefined
  ) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.role = role;
    this.bankInfo = bankInfo;
    this.address = address;
    this.authentication = authentication;
    Object.freeze(this);
  }

  static createFull(
    userData: UserProps
  ): Either<
    | InvalidAddressError
    | InvalidCpfError
    | InvalidEmailError
    | InvalidNameError
    | InvalidPhoneError
    | InvalidRoleError
    | InvalidCardNumberError
    | InvalidPaymentMethodError
    | InvalidPasswordError,
    User
  > {
    const validators = {
      username: (username: string) => Name.create(username),
      email: (email: string) => Email.create(email),
      cpf: (cpf: string) => Cpf.create(cpf),
      phone: (phone: string) => Phone.create(phone),
      role: (role: string) => Role.create(role),
      address: (address: any) => Address.create(address),
      authentication: (authentication: any) =>
        Authentication.create(authentication),
      bankInfo: (bankInfo: any) => BankInfo.create(bankInfo),
    };

    const validatedFields: Partial<Record<keyof typeof validators, any>> = {};

    const optionalFields = ['bankInfo', 'address'];

    // Iterate throught validators to validate all fields in userData
    for (const [key, value] of Object.entries(validators)) {
      // If it is an optional field and it was not provided, then skip its validation
      if (optionalFields.includes(key) && userData[key] === undefined) {
        continue;
      }

      const fieldOrError = value(userData[key]);

      if (fieldOrError.isLeft()) {
        return Either.left(fieldOrError.getLeft());
      }

      validatedFields[key] = fieldOrError.getRight();
    }

    return Either.right(
      new User(
        validatedFields.username,
        validatedFields.email,
        validatedFields.phone,
        validatedFields.cpf,
        validatedFields.role,
        validatedFields.authentication,
        validatedFields.address,
        validatedFields.bankInfo
      )
    );
  }

  static createPartial(
    userData: Partial<UserProps>
  ): Either<
    | InvalidAddressError
    | InvalidCpfError
    | InvalidEmailError
    | InvalidNameError
    | InvalidPhoneError
    | InvalidRoleError
    | InvalidCardNumberError
    | InvalidPaymentMethodError
    | InvalidPasswordError,
    User
  > {
    const validators = {
      username: (username: string) => Name.create(username),
      email: (email: string) => Email.create(email),
      cpf: (cpf: string) => Cpf.create(cpf),
      phone: (phone: string) => Phone.create(phone),
      role: (role: string) => Role.create(role),
      address: (address: any) => Address.create(address),
      authentication: (authentication: any) =>
        Authentication.create(authentication),
      bankInfo: (bankInfo: any) => BankInfo.create(bankInfo),
    };

    const validatedFields: Partial<Record<keyof typeof validators, any>> = {};

    // Iterate throught userData to validate all fields inside it
    for (const [key, value] of Object.entries(userData)) {
      const fieldOrError = validators[key](value);

      if (fieldOrError.isLeft()) {
        return Either.left(fieldOrError.getLeft());
      }

      validatedFields[key] = fieldOrError.getRight();
    }

    return Either.right(
      new User(
        validatedFields.username,
        validatedFields.email,
        validatedFields.phone,
        validatedFields.cpf,
        validatedFields.role,
        validatedFields.authentication,
        validatedFields.address,
        validatedFields.bankInfo
      )
    );
  }
}
