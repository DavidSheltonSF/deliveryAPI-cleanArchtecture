export interface BankAccountModel {
  userId: string;
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  createdAt: Date;
}
