import { Comparer } from '../contracts/Comparer';
import { AuthenticationProps } from './props/AuthenticationProps';

export class Authentication {
  private _id?: string;
  private _userId: string;
  private _passwordHash: string;
  private _sessionToken?: string;
  private _createdAt?: Date;

  constructor(authentication: AuthenticationProps) {
    const { id, userId, passwordHash, sessionToken, createdAt } =
      authentication;
    this._id = id;
    this._userId = userId;
    this._passwordHash = passwordHash;
    this._sessionToken = sessionToken;
    this._createdAt = createdAt;
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

  async compare(password: string, comparer: Comparer): Promise<boolean> {
    return await comparer.compare(password, this._passwordHash);
  }
}
