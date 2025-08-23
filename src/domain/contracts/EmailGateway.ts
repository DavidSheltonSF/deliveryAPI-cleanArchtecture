import { Either } from "../../shared/either";

export interface EmailConfig {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface EmailGateway {
  sendEmail(emailConfig: EmailConfig): Either<Error, EmailConfig>;
  get userEmail(): string
}
