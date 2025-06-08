import { WithId, Document } from "mongodb";
import { PaymentProps } from "../../../../../domain/entities/payment-props";
import { mongoHelper } from "../mongo-helper";

export class PaymentMapper {
  /* Converts database documents into Payment type objects */
  static toPayment (data: WithId<Document>): PaymentProps {
    const id = data._id.toString();
    const {
      orderId,
      paymentMethod,
      status,
    } = data;

    return {
      id,
      orderId,
      paymentMethod,
      status,
    };
  }

  static toPaymentDocument(data: PaymentProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data.id);
    const {
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