import { ObjectId } from 'mongodb';

export interface AuthenticationModel {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  sessionToken?: string;
  userId: ObjectId;
  createdAt: Date;
}
