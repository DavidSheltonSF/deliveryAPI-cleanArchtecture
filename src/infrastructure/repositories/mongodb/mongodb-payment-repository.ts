import { PaymentRepository } from '../../../application/_ports/payment-repository';
import { PaymentProps } from '../../../domain/entities/payment-props';
import { MongodbMapper } from './helpers/MongodbMapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbPaymentRepository implements PaymentRepository {
  async findAllPayments(): Promise<PaymentProps[]> {
    const paymentCollection = mongoHelper.getCollection('payment');
    const result = await paymentCollection.find().toArray();

    if (result) {
      const payments = result.map((elem) => {
        return MongodbMapper.toPayment(elem);
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
      return MongodbMapper.toPayment(result);
    }

    return null;
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentProps | null> {
    const paymentCollection = mongoHelper.getCollection('payment');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(orderId);
    const result = await paymentCollection?.findOne({ orderId: objId });

    if (result) {
      return MongodbMapper.toPayment(result);
    }

    return null;
  }

  async add(newPayment: Omit<PaymentProps, "id">): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection.insertOne(
      MongodbMapper.toMongodbDocument(newPayment)
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
