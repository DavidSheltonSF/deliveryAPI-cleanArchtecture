export interface Payment {
  orderId: string,
  paymentMethod: string,
  status: string,
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