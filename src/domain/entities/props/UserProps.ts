import { Role } from "../../_enums";
import { Birthday, Cpf, Email, Name, Phone, UserName } from "../../value-objects";

export interface UserProps {
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  role: Role;
  phone: Phone;
  birthday: Birthday;
}