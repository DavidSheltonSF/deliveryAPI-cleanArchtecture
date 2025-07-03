import {
  Email,
  Cpf,
  Role,
  Name,
  UserName,
  PasswordHash,
  Phone,
  Birthday,
} from '../../value-objects';
import { Authentication } from '../authentication/Authentication';
import { Address } from '../address/Address';

export class User {
  private _id: string;
  private _username: UserName;
  private _name: Name;
  private _email: Email;
  private _cpf: Cpf;
  private _phone: Phone;
  private _role: Role;
  private _birthday: Birthday;
  private _authentication: Authentication;

  constructor(
    id: string,
    username: UserName,
    name: Name,
    email: Email,
    cpf: Cpf,
    phone: Phone,
    role: Role,
    birthday: Birthday,
    authentication: Authentication
  ) {
    this._id = id;
    this._username = username;
    this._name = name;
    this._email = email;
    this._cpf = cpf;
    this._phone = phone;
    this._role = role;
    this._birthday = birthday;
    this._authentication = authentication;
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

  get passwordHash(): PasswordHash {
    return this._authentication.passwordHash;
  }
  get sessionToken(): string {
    return this._authentication.sessionToken;
  }

  activeSession(sessionToken: string) {
    this._authentication.updateSessionToken(sessionToken);
  }

  desactiveSession() {
    this._authentication.updateSessionToken(undefined);
  }

  isAdmin(): boolean {
    return this._role.get() === 'admin';
  }
}
