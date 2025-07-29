import { FieldsValidator } from '../../application/helpers/FieldsValidator';
import { Either } from '../../shared/either';
import { Role } from '../_enums';
import { PropertyAlreadySetError } from '../errors/';
import { userValidationErrorType } from '../errors/errorTypes';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../value-objects';
import { Authentication } from './Authentication';
import { RawUserProps } from './rawProps/RawUserProps';
import { UserProps } from './props/UserProps';
import { buildUserProps } from '../helpers/buildUserProps';

export class User {
  protected _id?: string;
  protected _username: UserName;
  protected _name: Name;
  protected _email: Email;
  protected _cpf: Cpf;
  protected _phone: Phone;
  protected _birthday: Birthday;
  protected readonly _role: Role;
  protected authentication: Authentication;
  protected _createdAt: Date;

  protected constructor(
    props: UserProps,
    role: Role,
    authentication: Authentication,
    createdAt?: Date
  ) {
    this._username = props.username;
    this._name = props.name;
    this._email = props.email;
    this._cpf = props.cpf;
    this._phone = props.phone;
    this._birthday = props.birthday;
    this._role = role;
    this.authentication = authentication;
    this._createdAt = createdAt ?? new Date();
  }

  static create(
    props: RawUserProps,
    role: Role,
    authentication: Authentication,
    createdAt?: Date
  ): Either<userValidationErrorType, User> {
    const validPropsOrError = buildUserProps(props);

    if (validPropsOrError.isLeft()) {
      return Either.left(validPropsOrError.getLeft());
    }

    const validProps = validPropsOrError.getRight();

    const user = new User(validProps, role, authentication, createdAt);

    return Either.right(user);
  }

  get id(): string | undefined {
    return this._id;
  }
  get username(): string {
    return this._username.getValue();
  }
  get name(): string {
    return this._name.getValue();
  }
  get email(): string {
    return this._email.getValue();
  }

  get cpf(): string {
    return this._cpf.getValue();
  }

  get phone(): string {
    return this._phone.getValue();
  }

  get role(): string {
    return this._role.toString();
  }

  get birthday(): Date {
    return this._birthday.getValue();
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

  setId(id: string): Either<Error, string> {
    if (this._id !== undefined) {
      return Either.left(new PropertyAlreadySetError('id'));
    }
    this._id = id;
    return Either.right(this._id);
  }

  activeSession(sessionToken: string) {
    this.authentication.startSession(sessionToken);
  }

  desactiveSession() {
    this.authentication.endSession();
  }

  isAdult(): boolean {
    const birthdayYear = new Date(this._birthday.getValue()).getFullYear();
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
}
