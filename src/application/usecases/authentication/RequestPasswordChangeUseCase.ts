import { RequestPasswordChangeUseCaseResponse } from './response';
import { Either } from '../../../shared/either';
import { UserRepository } from '../../ports/UserRepository';
import { NoResultError } from '../../errors';
import { TokenService } from '../../../domain/contracts/TokenService';
import { LinkConfig } from '../../ports/LinkConfig';
import { EmailGateway } from '../../../domain/contracts/EmailGateway';
import { EmailNotSentErrror } from '../../errors/EmailNotSentError';

export class RequestPasswordChangeUseCase {
  private readonly userRepository: UserRepository;
  private readonly tokenService: TokenService;
  private readonly emailGateway: EmailGateway;
  private readonly linkConfig: LinkConfig;

  constructor(
    userRepository: UserRepository,
    emailGateway: EmailGateway,
    tokenService: TokenService,
    linkConfig: LinkConfig
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.emailGateway = emailGateway;
    this.linkConfig = linkConfig;
  }

  async execute(email: string): Promise<RequestPasswordChangeUseCaseResponse> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser === null || existingUser.email.getValue() !== email) {
      return Either.left(
        new NoResultError(`There is no user with email '${email}'.`)
      );
    }

    const token = this.tokenService.sign({ email });

    const { baseUrl, port } = this.linkConfig;

    const link = `${baseUrl}:${port}/auth/reset-password?token=${token}`;

    const result = this.emailGateway.sendEmail({
      from: `Delivery API <${this.emailGateway.userEmail}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
      <p>Hello,</p>
      <p>You requested a password reset for your account.</p>
      <p>Click the following link to reset your password:</p>
      <a href="${link}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
`,
    });

    if (result.isLeft()) {
      return Either.left(
        new EmailNotSentErrror(`Email was not sent to ${email}`)
      );
    }

    return Either.right({ message: 'Ok' });
  }
}
