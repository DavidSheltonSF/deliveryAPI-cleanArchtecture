import { PaymentProps } from "../../../../../domain/entities/payment-props";

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