import { EmailConfig, EmailGateway } from '../../domain/contracts/EmailGateway';
import { Either } from '../../shared/either';

export const makeMockEmailGateway = (): EmailGateway => ({
  sendEmail: jest.fn((emailConfig: EmailConfig) => {
    return Either.right(emailConfig);
  }),
  userEmail: 'mock@email.com',
});
