import { Email, PasswordHash } from '../../value-objects';
import { AuthenticationProps } from './AuthenticationProps';

export class Authentication {
  private _id: string;
  private _email: Email;
  private _passwordHash: PasswordHash;
  private _sessionToken?: string;

  constructor(id: string, authenticationData: AuthenticationProps) {
    this._id = id;
    this._passwordHash = authenticationData.passwordHash;
    this._sessionToken = authenticationData.sessionToken;
  }

  get id(): string {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get passwordHash(): PasswordHash {
    return this._passwordHash;
  }

  get sessionToken(): string | undefined {
    return this._sessionToken;
  }

  updateSessionToken(sessionToken: string) {
    this._sessionToken = sessionToken;
  }
}
