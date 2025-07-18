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
import { UserProps } from './UserProps';

export class User {
  private _id?: string;
  private _username: UserName;
  private _name: Name;
  private _email: Email;
  private _cpf: Cpf;
  private _phone: Phone;
  private _role: Role;
  private _birthday: Birthday;
  private _authentication: Authentication;
  private _createdAt: Date

  constructor(userData: UserProps) {
    this._id = userData.id;
    this._username = userData.username;
    this._name = userData.name;
    this._email = userData.email;
    this._cpf = userData.cpf;
    this._phone = userData.phone;
    this._role = userData.role;
    this._birthday = userData.birthday;
    this._authentication = userData.authentication;
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
  get createdAt(): Date {
    return this._createdAt
  }

  activeSession(sessionToken: string) {
    this._authentication.updateSessionToken(sessionToken);
  }

  desactiveSession() {
    this._authentication.updateSessionToken(undefined);
  }

  isAdult(): boolean {
    if (this.birthday.getAge() < 18) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    return this._role.get() === 'admin';
  }
}
