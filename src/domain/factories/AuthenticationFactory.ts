import { Comparer } from '../contracts/Comparer';
import { Authentication } from '../entities/Authentication';
import { AuthenticationProps } from '../entities/props/AuthenticationProps';

export class AuthenticationFactory {
  static create(
    authenticationData: AuthenticationProps,
    comparer: Comparer
  ): Authentication {
    const authentication = new Authentication(authenticationData, comparer);
    return authentication;
  }
}
