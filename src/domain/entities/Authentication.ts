export class Authentication {
  private _id?: string;
  private _email: string;
  private _passwordHash: string;
  private _sessionToken?: string;

  constructor(
    email: string,
    passwordHash: string,
    sessionToken?: string,
    id?: string
  ) {
    this._id = id;
    this._email = email;
    this._passwordHash = passwordHash;
    this._sessionToken = sessionToken;
  }

  get id(): string {
    return this._id;
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

  updateSessionToken(sessionToken: string) {
    this._sessionToken = sessionToken;
  }
}
