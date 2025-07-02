import { ObjectId } from 'mongodb';

export interface Authentication {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  sessionToken: string;
  createdAt: Date;
}
