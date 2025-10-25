import { UserRole } from "../../_enums";
import { Email, Name, Password, Phone } from "../../value-objects";

export interface DriverProps {
  firstName: Name;
  lastName: Name;
  email: Email;
  role: UserRole;
  passwordHash: Password;
}
