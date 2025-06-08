import { PaymentRepository } from '../../../application/_ports/payment-repository';
import { PaymentProps } from '../../../domain/entities/payment-props';
import { PaymentMapper } from './helpers/mappers/payment-mapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbPaymentRepository implements PaymentRepository {
  async findAllPayments(): Promise<PaymentProps[]> {
    const paymentCollection = mongoHelper.getCollection('payment');
    const result = await paymentCollection.find().toArray();

    if (result) {
      const payments = result.map((elem) => {
        return PaymentMapper.toPayment(elem);
      });

      return payments;
    }
    return [];
  }

  async findPaymentById(payment: string): Promise<PaymentProps | null> {
    const paymentCollection = mongoHelper.getCollection('payment');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(payment);
    const result = await paymentCollection?.findOne({ _id: objId });

    if (result) {
      return PaymentMapper.toPayment(result);
    }

    return null;
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentProps | null> {
    const paymentCollection = mongoHelper.getCollection('payment');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(orderId);
    const result = await paymentCollection?.findOne({ orderId: objId });

    if (result) {
      return PaymentMapper.toPayment(result);
    }

    return null;
  }

  async add(payment: PaymentProps): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection?.insertOne(
      PaymentMapper.toPaymentDocument(payment)
    );
  }

  async update(
    paymentId: string,
    payment: Partial<PaymentProps>
  ): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection.updateOne(
      { _id: mongoHelper.toObjectId(paymentId) },
      { $set: payment }
    );
  }

  async remove(payment: string): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection.deleteOne({ _id: mongoHelper.toObjectId(payment) });
  }
}
