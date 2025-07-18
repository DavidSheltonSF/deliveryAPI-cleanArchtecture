import { ObjectId } from 'mongodb';

export interface CustomerModel {
  _id: ObjectId;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: Date;
  createdAt: Date;
}
