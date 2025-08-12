import { Password } from "../../value-objects";

export interface AuthenticationProps {
  userId?: string;
  passwordHash: Password;
  sessionToken?: string;
}

export interface authenticationWithId extends AuthenticationProps {
  id: string;
}