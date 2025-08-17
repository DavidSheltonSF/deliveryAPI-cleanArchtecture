import { Role } from "../../_enums";
import { Birthday, Cpf, Email, Name, Password, Phone } from "../../value-objects";

export interface UserProps {
  firstName: Name;
  lastName: Name;
  email: Email;
  cpf: Cpf;
  role: Role;
  phone: Phone;
  birthday: Birthday;
  passwordHash: Password
}