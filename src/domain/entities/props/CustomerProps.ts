import { Birthday, Cpf, Phone } from "../../value-objects";

export interface CustomerProps {
  userId: string;
  cpf: Cpf;
  phone: Phone;
  birthday: Birthday;
}
