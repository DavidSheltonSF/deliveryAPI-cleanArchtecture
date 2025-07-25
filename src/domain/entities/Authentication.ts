export class Authentication {
  private _id?: string;
  private _userId: string;
  private _email: string;
  private _passwordHash: string;
  private _sessionToken?: string;
  private _createdAt?: Date;

  constructor(
    userId: string,
    email: string,
    passwordHash: string,
    sessionToken?: string,
    createdAt?: Date,
    id?: string
  ) {
    this._id = id;
    this._email = email;
    this._passwordHash = passwordHash;
    this._sessionToken = sessionToken;
    this._createdAt = createdAt;
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get email(): string {
    return this._email;
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

  updateSessionToken(sessionToken: string) {
    this._sessionToken = sessionToken;
  }
}
