import { AuthenticationProps } from '../domain/entities/props/AuthenticationProps';
import { AuthenticationDTO } from '../presentation/dtos/AuthenticationDTO';

export function rawAuthenticationToProps(
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
