import { EmailConfig, EmailGateway } from '../domain/contracts/EmailGateway';
import { Either } from '../shared/either';

export class MockEmailGateway implements EmailGateway {
  sendEmail(emailConfig: EmailConfig):  Either<Error, EmailConfig> {
    return Either.right(emailConfig);
  }

  get userEmail(): string{
    return "fake@email.com"
  }

}
