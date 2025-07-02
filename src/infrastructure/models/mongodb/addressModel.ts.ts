import { ObjectId } from 'mongodb';

export interface AddressModel {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  userId: ObjectId;
}
