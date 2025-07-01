import { Cpf, Name } from '../../value-objects';

export interface BankAccountProps {
  holderName: Name;
  cpf: Cpf;
  bank: string;
  agency: string;
  accountNumber: string;
  accountType: string;
}