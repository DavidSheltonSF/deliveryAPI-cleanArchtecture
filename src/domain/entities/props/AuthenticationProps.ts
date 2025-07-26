import { Id, Password } from '../../value-objects';

export interface AuthenticationProps {
  userId: Id;
  password: Password;
  sessionToken?: string;
}
