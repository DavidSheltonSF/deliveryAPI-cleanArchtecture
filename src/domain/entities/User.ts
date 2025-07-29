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
