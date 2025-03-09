import { ObjectId } from 'mongodb';

export interface Payment {
  _id?: ObjectId,
  orderId: string,
  paymentMethod: string,
  status: string,
}

export class PaymentCast {
  /* Converts database documents into Payment type objects */
  static toPayment (data: Record<string, any>): Payment {
    const {
      _id,
      orderId,
      paymentMethod,
      status,
    } = data;

    return {
      _id,
      orderId,
      paymentMethod,
      status,
    }
  }
}