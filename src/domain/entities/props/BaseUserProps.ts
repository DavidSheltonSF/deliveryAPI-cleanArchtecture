import { Email, Name, Password } from "../../value-objects";

export interface BaseUserProps {
  firstName: Name;
  lastName: Name;
  email: Email;
  passwordHash: Password;
  role: string;
}
