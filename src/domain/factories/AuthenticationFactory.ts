import { Authentication } from '../entities/Authentication';
import { AuthenticationProps } from '../entities/props/AuthenticationProps';

export class AuthenticationFactory {
  static create(authenticationData: AuthenticationProps): Authentication {
    const authentication = new Authentication(authenticationData);
    return authentication;
  }
}
