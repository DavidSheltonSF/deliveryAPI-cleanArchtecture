import { Cpf, Name } from '../../value-objects';
import { ZipCode } from '../../value-objects/ZipCode';

export interface BankAccountProps {
  holderName: Name;
  cpf: Cpf;
  bank: string;
  agency: string;
  accountNumber: string;
  accountType: string;
}