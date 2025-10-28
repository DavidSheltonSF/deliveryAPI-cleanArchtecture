import { UserRole } from "../../_enums";
import { Email, Name, Password } from "../../value-objects";

export interface UserProps {
  firstName: Name;
  lastName: Name;
  email: Email;
  role: UserRole;
  passwordHash: Password;
  createdAt?: Date;
}
