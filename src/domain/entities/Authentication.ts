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
  private hashService: HashService;

  private constructor(
    props: AuthenticationProps,
    hashService: HashService,
    createdAt?: Date
  ) {
    this.props = props;
    this.hashService = hashService;
    this._createdAt = createdAt ?? new Date();
  }

  static async create(
    props: AuthenticationProps,
    hasher: HashService
  ): Promise<Authentication> {
    return new Authentication(props, hasher);
  }

  static createFromPersistence(
    data: AuthenticationModel,
    hasher: HashService
  ): Authentication {
    const { _id, passwordHash, sessionToken } = data;

    const id = _id.toString();
    const props = {
      userId: data.userId.toString(),
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

  async updatePasswordHash(
    password: string
  ): Promise<Either<InvalidPasswordError, string>> {
    const passwordHashOrError = await Password.create(
      password,
      this.hashService
    );

    if (passwordHashOrError.isLeft()) {
      return Either.left(passwordHashOrError.getLeft());
    }

    this.props.passwordHash = passwordHashOrError.getRight();

    return Either.right(this.props.passwordHash.getValue());
  }

  async compare(password: string): Promise<boolean> {
    return await this.props.passwordHash.compare(password, this.hashService);
  }
}
