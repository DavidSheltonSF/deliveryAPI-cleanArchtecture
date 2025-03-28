import { PaymentRepository } from "../../../application/usecases/ports/payment-repository";
import { Payment as Payment } from "../../../domain/entities/payment";
import { PaymentMapper } from "../../../domain/entities/payment";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbPaymentRepository implements PaymentRepository {
  
  async findAllPayments (): Promise<Payment[]> {
    const paymentCollection = mongoHelper.getCollection('payment');
    const result = await paymentCollection.find().toArray();

    if (result){
      const payments = result.map((elem) => {
        return PaymentMapper.toPayment(elem);
      });

      return payments;
    }
    return [];
  }

  async findPaymentById (payment: string): Promise<Payment | null> {
    const paymentCollection = mongoHelper.getCollection('payment');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(payment);
    const result = await paymentCollection?.findOne({_id: objId});

    if (result){
      return PaymentMapper.toPayment(result);
    }

    return null;
  }

  async findPaymentByOrderId (orderId: string): Promise<Payment | null> {
    const paymentCollection = mongoHelper.getCollection('payment');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(orderId);
    const result = await paymentCollection?.findOne({orderId: objId});

    if (result){
      return PaymentMapper.toPayment(result);
    }

    return null;
  }

  async add (payment: Payment): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection?.insertOne(payment);
  }

  async update (paymentId: string, payment: Omit<Payment, '_id'>): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection.updateOne(
      {_id: mongoHelper.toObjectId(paymentId)},
      {$set: payment}
    );
  }

  async remove (payment: string): Promise<void> {
    const paymentCollection = mongoHelper.getCollection('payment');
    await paymentCollection.deleteOne(
      {_id: mongoHelper.toObjectId(payment)}
    );
  }
}