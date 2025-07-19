import { Authentication } from '../entities/authentication/Authentication';
import { AuthenticationProps } from '../entities/authentication/AuthenticationProps';

export class AuthenticationFactory {
  static create(authenticationProps: AuthenticationProps): Authentication {
    const { email, passwordHash, sessionToken } = authenticationProps;

    const addressEntity = new Authentication(email, passwordHash, sessionToken);

    return addressEntity;
  }
}
