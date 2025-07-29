import { Password } from "../../value-objects";

export interface AuthenticationProps {
  userId: string;
  passwordHash: Password;
  sessionToken?: string;
}
