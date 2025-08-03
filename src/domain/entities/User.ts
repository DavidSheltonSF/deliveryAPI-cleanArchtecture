import { Either } from '../../shared/either';
import { Role } from '../_enums';
import { InvalidPasswordError, InvalidUserNameError } from '../errors/';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../value-objects';
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

  updateUserName(
    username: string | undefined
  ): Either<InvalidUserNameError, null> {
    if (username === undefined) {
      return Either.right(null);
    }

    const usernameOrError = UserName.create(username);
    if (usernameOrError.isLeft()) {
      return Either.left(usernameOrError.getLeft());
    }

    this._props.username = usernameOrError.getRight();
    return Either.right(null);
  }

  updateName(name: string): Either<InvalidUserNameError, null> {
    if (name === undefined) {
      return Either.right(null);
    }

    const nameOrError = Name.create(name);
    if (nameOrError.isLeft()) {
      return Either.left(nameOrError.getLeft());
    }

    this._props.name = nameOrError.getRight();
    return Either.right(null);
  }

  updateEmail(email: string): Either<InvalidUserNameError, null> {
    if (email === undefined) {
      return Either.right(null);
    }

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return Either.left(emailOrError.getLeft());
    }

    this._props.email = emailOrError.getRight();
    return Either.right(null);
  }

  updateCpf(cpf: string): Either<InvalidUserNameError, null> {
    if (cpf === undefined) {
      return Either.right(null);
    }

    const cpfOrError = Cpf.create(cpf);
    if (cpfOrError.isLeft()) {
      return Either.left(cpfOrError.getLeft());
    }

    this._props.cpf = cpfOrError.getRight();
    return Either.right(null);
  }

  updatePhone(phone: string): Either<InvalidUserNameError, null> {
    if (phone === undefined) {
      return Either.right(null);
    }

    const phoneOrError = Phone.create(phone);
    if (phoneOrError.isLeft()) {
      return Either.left(phoneOrError.getLeft());
    }

    this._props.phone = phoneOrError.getRight();
    return Either.right(null);
  }

  updateBirthday(
    birthday: Date
  ): Either<InvalidUserNameError, null> {
    if (birthday === undefined) {
      return Either.right(null);
    }

    const birthdayOrErrorOrError = Birthday.create(birthday);
    if (birthdayOrErrorOrError.isLeft()) {
      return Either.left(birthdayOrErrorOrError.getLeft());
    }

    this._props.birthday = birthdayOrErrorOrError.getRight();
    return Either.right(null);
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

  async updatePassword(
    passwordHash: string
  ): Promise<Either<InvalidPasswordError, string>> {
    if (passwordHash === undefined) {
      return null;
    }

    const passwordOrError = await this.authentication.updatePasswordHash(
      passwordHash
    );

    if (passwordOrError.isLeft()) {
      return Either.left(passwordOrError.getLeft());
    }

    return Either.right(passwordOrError.getRight());
  }
}
