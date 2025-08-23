import nodemailer, { Transporter } from 'nodemailer';
import { EmailGatewayConfig } from '../../application/ports/EmailConfig';
import { EmailConfig, EmailGateway } from '../../domain/contracts/EmailGateway';
import { Either } from '../../shared/either';

export class NodeMailerGateway implements EmailGateway {
  private config: EmailGatewayConfig
  private transporter: Transporter;

  private constructor(config: EmailGatewayConfig, transporter: Transporter) {
    this.config = config;
    this.transporter = transporter;
  }

  create(config: EmailGatewayConfig): Either<Error, NodeMailerGateway> {
    try {
      const transporter = nodemailer.createTransport({ ...config });
      return Either.right(new NodeMailerGateway(config, transporter));
    } catch (error) {
      console.log(error);
      return Either.left(error)
    }
  }

  sendEmail(emailConfig: EmailConfig): Either<Error, EmailConfig> {
    if (this.transporter === null) {
      return Either.left(new Error('Gateway is not configured'));
    }

    try {
      this.transporter.sendMail(emailConfig);
      return Either.right(emailConfig);
    } catch (error) {
      console.log(error);
      return Either.left(error);
    }
  }

  get userEmail(): string {
    return this.config.user
  }
}
