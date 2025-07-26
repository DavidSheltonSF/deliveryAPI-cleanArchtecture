import { ObjectId } from 'mongodb';

export interface AuthenticationModel {
  _id: ObjectId;
  userId: ObjectId;
  passwordHash: string;
  sessionToken?: string;
  createdAt: Date;
}
