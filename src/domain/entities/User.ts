import { Authentication } from './Authentication';
import { UserProps } from './props/UserProps';

export class User {
  private _id?: string;
  private _username: string;
  private _name: string;
  private _email: string;
  private _cpf: string;
  private _phone: string;
  private _role: string;
  private _birthday: Date;
  private _authentication: Authentication;
  private _createdAt: Date;

  constructor(user: UserProps) {
    const {
      id,
      username,
      name,
      email,
      cpf,
      phone,
      role,
      birthday,
      authentication,
    } = user;
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
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get cpf(): string {
    return this._cpf;
  }
  set cpf(value: string) {
    this._cpf = value;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }

  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role = value;
  }

  get birthday(): Date {
    return this._birthday;
  }
  set birthday(value: Date) {
    this._birthday = value;
  }

  get passwordHash(): string {
    return this._authentication.passwordHash;
  }
  get sessionToken(): string {
    return this._authentication.sessionToken;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  activeSession(sessionToken: string) {
    this._authentication.startSession(sessionToken);
  }

  desactiveSession() {
    this._authentication.endSession();
  }

  isAdult(): boolean {
    const birthdayYear = new Date(this.birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthdayYear;
    if (age < 18) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    return this._role === 'admin';
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return await this._authentication.compare(password);
  }
}
