import { Email, Name } from "./validation";
import { Password } from "./validation/Password";

export interface BaseUserProps {
  username: Name;
  email: Email;
  authentication: {
    passwordHash: Password;
    sessionToken?: string;
  };
}
