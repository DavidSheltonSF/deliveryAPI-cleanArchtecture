import { Email, UserName } from '../value-objects';
import { HashedPassword } from '../value-objects';

export interface AuthenticationProps {
  hashedPassword: HashedPassword;
  sessionToken?: string;
}

export interface BaseUserProps {
  username: UserName;
  email: Email;
  authentication: AuthenticationProps;
}
