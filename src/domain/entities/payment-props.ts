import { ObjectId } from 'mongodb';

export interface PaymentProps {
  _id: ObjectId | null,
  orderId: string,
  paymentMethod: string,
  status: string,
}