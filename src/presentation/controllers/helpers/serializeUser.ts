import { UserProps } from '../../../domain/entities/user-props';

export function serializeUser(userProps: UserProps) {
  const { authentication, bankInfo, ...safeUser } = userProps;

  return safeUser;
}
