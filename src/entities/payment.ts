import { PaymentMethod } from "./validators/_enums";

export interface Payment {
  orderId: string,
  paymentMethod: PaymentMethod,
  status: number,
}

export class PaymentCast {
  /* Converts database documents into Payment type objects */
  static toPayment (data: Record<string, any>): Payment {
    const {
      orderId,
      paymentMethod,
      status,
    } = data;

    return {
      orderId,
      paymentMethod,
      status,
    }
  }
}