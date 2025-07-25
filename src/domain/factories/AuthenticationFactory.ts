import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';
import { Hasher } from '../contracts/Hasher';
import { Authentication } from '../entities/Authentication';

export class AuthenticationFactory {
  static async create(
    authenticationDTO: AuthenticationDTO,
    email: string,
    hasher: Hasher
  ): Promise<Authentication> {
    const { password, sessionToken } = authenticationDTO;

    const passwordHash = await hasher.hash(password);

    const authenticationEntity = new Authentication(
      email,
      passwordHash,
      sessionToken
    );

    return authenticationEntity;
  }
}
