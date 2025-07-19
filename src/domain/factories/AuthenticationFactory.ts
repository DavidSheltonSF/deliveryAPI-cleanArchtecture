import { Authentication } from '../entities/authentication/Authentication';
import { AuthenticationProps } from '../entities/authentication/AuthenticationProps';

export class AuthenticationFactory {
  static create(authenticationProps: AuthenticationProps, userEmail: string): Authentication {
    const { passwordHash, sessionToken } = authenticationProps;

    const addressEntity = new Authentication(userEmail, passwordHash, sessionToken);

    return addressEntity;
  }
}
