import { Email, Name } from './value-objects';
import { HashedPassword } from './value-objects';

export interface AuthenticationProps {
  hashedPassword: HashedPassword;
  sessionToken?: string;
}

export interface BaseUserProps {
  username: Name;
  email: Email;
  authentication: AuthenticationProps;
}
