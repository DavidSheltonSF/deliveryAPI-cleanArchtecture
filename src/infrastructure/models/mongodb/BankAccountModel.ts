export interface BankAccountModel {
  userId: ObjectId;
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  createdAt: Date;
}

export interface BankAccountModelWithId extends BankAccountModel {
  id: string;
}