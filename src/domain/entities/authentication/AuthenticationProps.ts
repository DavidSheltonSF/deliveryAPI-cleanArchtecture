import { Email, PasswordHash } from '../../value-objects';

export interface AuthenticationProps {
  id?: string;
  passwordHash: string;
  sessionToken?: string;
}
