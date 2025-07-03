import { ObjectId } from 'mongodb';

export interface BankAccountModel {
  _id: ObjectId;
  holderName: string;
  cpf: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  userId: ObjectId;
}
