import { Email, Password } from '../../value-objects';

export interface AuthenticationProps {
  email: Email;
  password: Password;
  sessionToken?: string;
}
