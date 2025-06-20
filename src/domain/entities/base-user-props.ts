import { Email, Name } from "./validation";
import { Password } from "./validation/Password";

export interface AuthenticationProps {
  passwordHash: Password;
  sessionToken?: string;
}

export interface BaseUserProps {
  username: Name;
  email: Email;
  authentication: AuthenticationProps;
}
