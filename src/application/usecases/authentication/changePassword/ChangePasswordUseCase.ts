import { Either } from '../../../../shared/either';
import { UserRepository } from '../../../ports/UserRepository';
import { NoResultError } from '../../../errors';
import { TokenService } from '../../../../domain/contracts/TokenService';
import { ChangePasswordResponse } from './response';
import { HashService } from '../../../../domain/contracts/HashService';
import { Password } from '../../../../domain/value-objects';
import { InvalidPasswordError } from '../../../../domain/errors';
import { InvalidTokenError } from '../../../errors/InvalidTokenError';
import { SimilarPasswordsError } from '../../../errors/SimilarPasswordsError';

export class ChangePasswordUseCase {
  private readonly userRepository: UserRepository;
  private readonly tokenService: TokenService;
  private readonly hashService: HashService;

  constructor(
    userRepository: UserRepository,
    tokenService: TokenService,
    hashService: HashService
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.hashService = hashService;
  }

  async execute(
    token: string,
    newPasssword: string
  ): Promise<ChangePasswordResponse> {
    const decodedToken = this.tokenService.verify(token);
    if (decodedToken === null) {
      return Either.left(new InvalidTokenError());
    }

    const email = decodedToken.email;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser === null || existingUser.email.getValue() !== email) {
      return Either.left(
        new NoResultError(`The email '${email}' was not found.`)
      );
    }

    const currentPassword = existingUser.passwordHash.getValue();
    const passwordAreSimilar = await this.hashService.compare(
      newPasssword,
      currentPassword
    );
    if (passwordAreSimilar) {
      return Either.left(new SimilarPasswordsError());
    }

    const passwordOrError = await Password.create(
      newPasssword,
      this.hashService
    );
    if (passwordOrError.isLeft()) {
      return Either.left(
        new InvalidPasswordError('Password provided is invalid')
      );
    }

    existingUser.passwordHash = passwordOrError.getRight();
    const response = this.userRepository.update(existingUser.id, existingUser);
    if (response === null) {
      return Either.left(
        Error(`Something went wrong and password was not updated`)
      );
    }

    return Either.right({ message: 'Ok' });
  }
}
