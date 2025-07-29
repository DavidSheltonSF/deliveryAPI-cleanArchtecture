import { Either } from '../../shared/either';
import { HashService } from '../contracts/HashService';
import { PropertyAlreadySetError } from '../errors';
import { authenticationErrorType } from '../errors/errorTypes';
import { buildAuthenticationProps } from '../helpers/buildAuthenticationProps';
import { Password } from '../value-objects';
import { AuthenticationProps } from './props/AuthenticationProps';
import { RawAuthenticationProps } from './rawProps/RawAuthenticationProps';

export class Authentication {
  private _id?: string;
  private _userId: string;
  private _passwordHash: Password;
  private _sessionToken?: string;
  private _createdAt?: Date;
  private _hashservice: HashService;

  constructor(
    authentication: AuthenticationProps,
    hashservice: HashService,
    createdAt?: Date
  ) {
    const { userId, passwordHash, sessionToken } = authentication;
    this._userId = userId;
    this._passwordHash = passwordHash;
    this._sessionToken = sessionToken;
    this._hashservice = hashservice;
    this._createdAt = createdAt ?? new Date();
  }

  static async create(
    props: RawAuthenticationProps,
    hasher: HashService,
  ): Promise<Either<authenticationErrorType, Authentication>> {
    const validPropsOrError = await buildAuthenticationProps(props, hasher);

    if (validPropsOrError.isLeft()) {
      return Either.left(validPropsOrError.getLeft());
    }

    const validProps = validPropsOrError.getRight();

    return Either.right(new Authentication(validProps, hasher));
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get passwordHash(): string {
    return this._passwordHash.getValue();
  }

  get sessionToken(): string | undefined {
    return this._sessionToken;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  startSession(sessionToken: string) {
    this._sessionToken = sessionToken;
  }

  endSession() {
    this._sessionToken = undefined;
  }

  async updatePasswordHash(password: string) {
    const passwordHashOrError = await Password.create(
      password,
      this._hashservice
    );

    if (passwordHashOrError.isLeft()) {
      return Either.left(passwordHashOrError.getLeft());
    }

    this._passwordHash = passwordHashOrError.getRight();
  }

  async compare(password: string): Promise<boolean> {
    return await this._passwordHash.compare(password, this._hashservice);
  }
}
