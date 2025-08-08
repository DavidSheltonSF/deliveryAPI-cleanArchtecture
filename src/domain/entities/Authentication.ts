import { AuthenticationModel } from '../../infrastructure/models/mongodb/AuthenticationModel';
import { Either } from '../../shared/either';
import { HashService } from '../contracts/HashService';
import { InvalidPasswordError } from '../errors';
import { Password } from '../value-objects';
import { AuthenticationProps } from './props/AuthenticationProps';

export class Authentication {
  private _id?: string;
  private props: AuthenticationProps;
  private _createdAt?: Date;
  private _hashService: HashService;

  private constructor(
    props: AuthenticationProps,
    hashService: HashService,
    createdAt?: Date
  ) {
    this.props = props;
    this._hashService = hashService;
    this._createdAt = createdAt ?? new Date();
  }

  static create(
    props: AuthenticationProps,
    hasher: HashService
  ): Authentication {
    return new Authentication(props, hasher);
  }

  static createFromPersistence(
    data: AuthenticationModel,
    hasher: HashService
  ): Authentication {
    const { _id, passwordHash, sessionToken } = data;

    const id = _id;
    const props = {
      userId: data.userId,
      passwordHash: Password.createFromPersistence(passwordHash),
      sessionToken,
    };

    const auth = new Authentication(props, hasher);
    auth._id = id;

    return auth;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get passwordHash(): string {
    return this.props.passwordHash.getValue();
  }

  get hashService(): HashService {
    return this._hashService;
  }

  get sessionToken(): string | undefined {
    return this.props.sessionToken;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  startSession(sessionToken: string) {
    this.props.sessionToken = sessionToken;
  }

  endSession() {
    this.props.sessionToken = undefined;
  }

  async updatePasswordHash(passwordHash: Password): Promise<void> {
    this.props.passwordHash = passwordHash;
  }

  async compare(password: string): Promise<boolean> {
    return await this.props.passwordHash.compare(password, this.hashService);
  }
}
