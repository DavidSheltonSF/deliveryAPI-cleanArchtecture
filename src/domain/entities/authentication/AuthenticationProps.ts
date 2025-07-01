import { Email, PasswordHash } from '../../value-objects';

export interface AuthenticationProps {
  email: Email;
  passwordHash: PasswordHash;
  sessionToken?: string;
}
