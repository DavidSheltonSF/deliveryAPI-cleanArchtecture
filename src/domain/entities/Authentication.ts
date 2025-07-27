import { HashService } from '../contracts/HashService';
import { AuthenticationProps } from './props/AuthenticationProps';

export class Authentication {
  private _id?: string;
  private _userId: string;
  private _passwordHash: string;
  private _sessionToken?: string;
  private _createdAt?: Date;
  private _hashservice: HashService;

  constructor(authentication: AuthenticationProps, hashservice: HashService) {
    const { userId, passwordHash, sessionToken } =
      authentication;
    this._userId = userId;
    this._passwordHash = passwordHash;
    this._sessionToken = sessionToken;
    this._hashservice = hashservice
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
