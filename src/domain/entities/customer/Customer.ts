import {
  Email,
  Cpf,
  Phone,
  Role,
  Address,
  Name,
  Birthday,
  UserName,
  HashedPassword,
} from '../../value-objects';
import { CustomerProps } from './CustomerProps';

export class Customer {
  private _id: string;
  private _username: UserName;
  private _name: Name;
  private _email: Email;
  private _cpf: Cpf;
  private _phone: Phone;
  private _role: Role;
  private _birthday: Birthday;
  private _address: Address;
  private _authentication: {
    hashedPassword: HashedPassword;
    sessionToken?: string;
  };

  constructor(customerData: CustomerProps) {
    this._username = customerData.username;
    this._name = customerData.name;
    this._email = customerData.email;
    this._cpf = customerData.cpf;
    this._phone = customerData.phone;
    this._role = customerData.role;
    this._birthday = customerData.birthday;
    this._address = customerData.address;
    this._authentication = customerData.authentication;
  }
  get id(): string {
    return this._id;
  }
  get username(): UserName {
    return this._username;
  }
  set username(value: UserName) {
    this._username = value;
  }

  get name(): Name {
    return this._name;
  }
  set name(value: Name) {
    this._name = value;
  }

  get email(): Email {
    return this._email;
  }
  set email(value: Email) {
    this._email = value;
  }

  get cpf(): Cpf {
    return this._cpf;
  }
  set cpf(value: Cpf) {
    this._cpf = value;
  }

  get phone(): Phone {
    return this._phone;
  }
  set phone(value: Phone) {
    this._phone = value;
  }

  get role(): Role {
    return this._role;
  }
  set role(value: Role) {
    this._role = value;
  }

  get birthday(): Birthday {
    return this._birthday;
  }
  set birthday(value: Birthday) {
    this._birthday = value;
  }

  get address(): Address {
    return this._address;
  }
  set address(value: Address) {
    this._address = value;
  }

  get hashedPassword(): HashedPassword {
    return this._authentication.hashedPassword;
  }
  set hashedPassword(value: HashedPassword) {
    this._authentication.hashedPassword = value;
  }

  get sessionToken(): string {
    return this._authentication.sessionToken;
  }

  activeSession(sessionToken: string) {
    this._authentication.sessionToken = sessionToken;
  }

  desactiveSession() {
    this._authentication.sessionToken = undefined;
  }

  isAdult(): boolean {
    const age = this.birthday.getAge();
    // Adult age in Brazil
    if (age < 18) {
      return false;
    }

    return true;
  }
}
