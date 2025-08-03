import { Either } from '../../shared/either';
import { Role } from '../_enums';
import { InvalidPasswordError, InvalidUserNameError } from '../errors/';
import { Birthday, Cpf, Email, Name, Password, Phone, UserName } from '../value-objects';
import { Authentication } from './Authentication';
import { UserProps } from './props/UserProps';

export class User {
  protected _id?: string;
  protected _props: UserProps;
  protected readonly _role: Role;
  protected authentication: Authentication;
  protected _createdAt: Date;

  constructor(
    props: UserProps,
    role: Role,
    authentication: Authentication,
    createdAt?: Date
  ) {
    this._props = props;
    this._role = role;
    this.authentication = authentication;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string | undefined {
    return this._id;
  }

  get props(): any {
    const { username, name, email, cpf, phone, birthday } = this._props;

    return {
      username: username.getValue(),
      name: name.getValue(),
      email: email.getValue(),
      cpf: cpf.getValue(),
      phone: phone.getValue(),
      birthday: birthday.getValue(),
    };
  }

  get username(): string {
    return this._props.username.getValue();
  }
  get name(): string {
    return this._props.name.getValue();
  }
  get email(): string {
    return this._props.email.getValue();
  }

  get cpf(): string {
    return this._props.cpf.getValue();
  }

  get phone(): string {
    return this._props.phone.getValue();
  }

  get role(): string {
    return this._role.toString();
  }

  get birthday(): Date {
    return this._props.birthday.getValue();
  }

  get passwordHash(): string {
    return this.authentication.passwordHash;
  }

  get sessionToken(): string {
    return this.authentication.sessionToken;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  updateUserName(username: UserName) {
    this._props.username = username;
  }

  updateName(name: Name) {
    this._props.name = name;
  }

  updateEmail(email: Email) {
    this._props.email = email;
  }

  updateCpf(cpf: Cpf) {
    this._props.cpf = cpf;
  }

  updatePhone(phone: Phone) {
    this._props.phone = phone;
  }

  updateBirthday(birthday: Birthday) {
    this._props.birthday = birthday;
  }

  activeSession(sessionToken: string) {
    this.authentication.startSession(sessionToken);
  }

  desactiveSession() {
    this.authentication.endSession();
  }

  isAdult(): boolean {
    const birthdayYear = new Date(
      this._props.birthday.getValue()
    ).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthdayYear;
    if (age < 18) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return await this.authentication.compare(password);
  }

  async updatePassword(passwordHash: Password): Promise<void> {
    await this.authentication.updatePasswordHash(passwordHash);
  }
}
