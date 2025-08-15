import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';

export class AuthenticationMapper {

  static propsToPersistence(auth: AuthenticationProps): AuthenticationModel {
    const { userId, passwordHash, sessionToken } = auth;

    return {
      userId,
      passwordHash: passwordHash.getValue(),
      sessionToken,
      createdAt: new Date(),
    };
  }
}
