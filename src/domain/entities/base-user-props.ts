import { Email, Name } from './value-objects';
import { Password } from './value-objects/Password';

export interface AuthenticationProps {
  passwordHash: Password;
  sessionToken?: string;
}

export interface BaseUserProps {
  username: Name;
  email: Email;
  authentication: AuthenticationProps;
}
