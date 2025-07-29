import { Either } from '../../shared/either';
import { HashService } from '../contracts/HashService';
import { PropertyAlreadySetError } from '../errors';
import { Password } from '../value-objects';
import { AuthenticationProps } from './props/AuthenticationProps';

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

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get sessionToken(): string | undefined {
    return this._sessionToken;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  setId(id: string): Either<PropertyAlreadySetError, string> {
    if (this._id !== undefined) {
      return Either.left(new PropertyAlreadySetError('id'));
    }
    this._id = id;
    return Either.right(this._id);
  }

  startSession(sessionToken: string) {
    this._sessionToken = sessionToken;
  }

  endSession() {
    this._sessionToken = undefined;
  }

  updatePasswordHash(passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  async compare(password: string): Promise<boolean> {
    return await this._hashservice.compare(password, this._passwordHash);
  }
}
