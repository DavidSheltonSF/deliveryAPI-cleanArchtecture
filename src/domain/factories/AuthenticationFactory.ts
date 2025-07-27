import { HashService } from '../contracts/HashService';
import { Authentication } from '../entities/Authentication';
import { AuthenticationProps } from '../entities/props/AuthenticationProps';

export class AuthenticationFactory {
  static create(
    authenticationData: AuthenticationProps,
    hashservice: HashService
  ): Authentication {
    const authentication = new Authentication(authenticationData, hashservice);
    return authentication;
  }
}
