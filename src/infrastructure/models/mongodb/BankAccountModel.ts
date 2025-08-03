export interface BankAccountModel {
  _id: string;
  userId: ObjectId;
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  createdAt: Date;
}
