import { FieldsValidator } from '../../application/helpers/FieldsValidator';
import { Either } from '../../shared/either';
import { Role } from '../_enums';
import { InvalidUserNameError, PropertyAlreadySetError } from '../errors/';
import { userValidationErrorType } from '../errors/errorTypes';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../value-objects';
import { Authentication } from './Authentication';
import { RawUserProps } from './rawProps/RawUserProps';
import { UserProps } from './props/UserProps';
import { buildUserProps } from '../helpers/buildUserProps';
import { valueObjectMap } from '../value-objects/tests/valueObjectMap';
import { UserValidation } from '../helpers/validateUserProps';
import { validateEitherValues } from '../../utils/validateEitherValues';

export class User {
  protected _id?: string;
  protected props: UserProps;
  protected readonly _role: Role;
  protected authentication: Authentication;
  protected _createdAt: Date;

  protected constructor(
    props: UserProps,
    role: Role,
    authentication: Authentication,
    createdAt?: Date
  ) {
    this.props = props;
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
    return this.props.username.getValue();
  }
  get name(): string {
    return this.props.name.getValue();
  }
  get email(): string {
    return this.props.email.getValue();
  }

  get cpf(): string {
    return this.props.cpf.getValue();
  }

  get phone(): string {
    return this.props.phone.getValue();
  }

  get role(): string {
    return this._role.toString();
  }

  get birthday(): Date {
    return this.props.birthday.getValue();
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

  update(
    data: Partial<RawUserProps>
  ): Either<userValidationErrorType, UserProps> {
    const { username, name, email, cpf, phone, birthday } = data;

    const updateUserNameResult = this.updateUserName(username);
    const updateNameResult = this.updateName(name);
    const updateEmailResult = this.updateEmail(email);
    const updateCpfResult = this.updateCpf(cpf);
    const updatePhoneResult = this.updatePhone(phone);
    const updateBirthdayResult = this.updateBirthday(birthday);

    if (updateUserNameResult.isLeft()) {
      return Either.left(updateUserNameResult.getLeft());
    }
    if (updateNameResult.isLeft()) {
      return Either.left(updateNameResult.getLeft());
    }
    if (updateEmailResult.isLeft()) {
      return Either.left(updateEmailResult.getLeft());
    }
    if (updateCpfResult.isLeft()) {
      return Either.left(updateCpfResult.getLeft());
    }
    if (updatePhoneResult.isLeft()) {
      return Either.left(updatePhoneResult.getLeft());
    }
    if (updateBirthdayResult.isLeft()) {
      return Either.left(updateBirthdayResult.getLeft());
    }

    return Either.right(this.props);
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

    this.props.username = usernameOrError.getRight();
    return Either.right(null);
  }

  updateName(name: string | undefined): Either<InvalidUserNameError, null> {
    if (name === undefined) {
      return Either.right(null);
    }

    const nameOrError = Name.create(name);
    if (nameOrError.isLeft()) {
      return Either.left(nameOrError.getLeft());
    }

    this.props.name = nameOrError.getRight();
    return Either.right(null);;
  }

  updateEmail(email: string | undefined): Either<InvalidUserNameError, null> {
    if (email === undefined) {
      return Either.right(null);
    }

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return Either.left(emailOrError.getLeft());
    }

    this.props.email = emailOrError.getRight();
    return Either.right(null);
  }

  updateCpf(cpf: string | undefined): Either<InvalidUserNameError, null> {
    if (cpf === undefined) {
      return Either.right(null);
    }

    const cpfOrError = Cpf.create(cpf);
    if (cpfOrError.isLeft()) {
      return Either.left(cpfOrError.getLeft());
    }

    this.props.cpf = cpfOrError.getRight();
    return Either.right(null);
  }

  updatePhone(phone: string | undefined): Either<InvalidUserNameError, null> {
    if (phone === undefined) {
      return Either.right(null);
    }

    const phoneOrError = Phone.create(phone);
    if (phoneOrError.isLeft()) {
      return Either.left(phoneOrError.getLeft());
    }

    this.props.phone = phoneOrError.getRight();
    return Either.right(null);
  }

  updateBirthday(
    birthday: Date | undefined
  ): Either<InvalidUserNameError, null> {
    if (birthday === undefined) {
      return Either.right(null);
    }

    const birthdayOrErrorOrError = Birthday.create(birthday);
    if (birthdayOrErrorOrError.isLeft()) {
      return Either.left(birthdayOrErrorOrError.getLeft());
    }

    this.props.birthday = birthdayOrErrorOrError.getRight();
    return Either.right(null);
  }

  activeSession(sessionToken: string) {
    this.authentication.startSession(sessionToken);
  }

  desactiveSession() {
    this.authentication.endSession();
  }

  isAdult(): boolean {
    const birthdayYear = new Date(this.props.birthday.getValue()).getFullYear();
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
