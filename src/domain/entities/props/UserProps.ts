import { Birthday, Cpf, Email, Name, Phone, UserName } from "../../value-objects";

export interface UserProps {
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  birthday: Birthday;
}