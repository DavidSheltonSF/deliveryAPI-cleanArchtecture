import { ObjectId } from 'mongodb';

export interface PaymentProps {
  _id: ObjectId | null,
  orderId: string,
  paymentMethod: string,
  status: string,
}

export class PaymentMapper {
  /* Converts database documents into Payment type objects */
  static toPayment (data: Record<string, any>): PaymentProps {
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