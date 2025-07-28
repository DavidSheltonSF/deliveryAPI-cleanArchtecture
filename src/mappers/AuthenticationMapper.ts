import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { AuthenticationModel } from '../infrastructure/models/mongodb/AuthenticationModel';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';

export class AuthenticationMapper {
  static rawToProps(
    authenticationDTO: AuthenticationDTO,
    userId?: string
  ): AuthenticationProps {
    const { password, sessionToken } = authenticationDTO;

    const authenticationProps = {
      userId,
      passwordHash: password,
      sessionToken: sessionToken,
    };

    return authenticationProps;
  }
}
