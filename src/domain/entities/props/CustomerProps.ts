import { Birthday, Cpf, Phone } from "../../value-objects";

export interface CustomerProps {
  cpf: Cpf;
  phone: Phone;
  birthday: Birthday;
}
