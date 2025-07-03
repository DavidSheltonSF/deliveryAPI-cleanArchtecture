import { ObjectId } from 'mongodb';

export interface UserModel {
  _id: ObjectId;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  birthday?: Date;
  role: string;
  createdAt: Date;
}
