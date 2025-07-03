import { ObjectId } from 'mongodb';

export interface AddressModel {
  _id: ObjectId;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  userId: ObjectId;
  createdAt: Date;
}
