import { Email, PasswordHash } from '../../value-objects';

export interface AuthenticationProps {
  id?: string;
  email: Email;
  passwordHash: PasswordHash;
  sessionToken?: string;
}
