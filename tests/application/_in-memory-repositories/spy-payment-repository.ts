import { PaymentRepository } from "../../../src/application/_ports/payment-repository";
import { PaymentProps } from "../../../src/domain/entities/payment-props";

export class SpyPaymentRepository implements PaymentRepository {
  paymentDatabase: PaymentProps[] = [];
  addParams: {
    payment?: PaymentProps
  } = {};
  findPaymentByIdParams: {
    id?: string,
  } = {};
  findPaymentByOrderIdParams: {
    orderId?: string,
  } = {};
  updateParams: {
    paymentId?: string,
    payment?: Omit<PaymentProps, '_id'>,
  } = {};
  removeParams: {
    paymentId?: string,
  } = {};

  async findAllPayments(): Promise<PaymentProps[]> {
    return this.paymentDatabase;
  }

  async findPaymentById(id: string): Promise<PaymentProps | null> {
    this.findPaymentByIdParams = { id };
    for (let i = 0; i < this.paymentDatabase.length; i++) {
      if (this.paymentDatabase[i]._id?.toString() === id) {
        return this.paymentDatabase[i];
      }
    }
    return null;
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentProps | null> {
    this.findPaymentByOrderIdParams = { orderId };
    for (let i = 0; i < this.paymentDatabase.length; i++) {
      if (this.paymentDatabase[i].orderId === orderId) {
        return this.paymentDatabase[i];
      }
    }
    return null;
  }

  async add(payment: PaymentProps): Promise<void> {
    this.addParams = { payment };
      }

  async update(paymentId: string, payment: Omit<PaymentProps, '_id'>): Promise<void> {
    this.updateParams = {
      paymentId,
      payment
    };
  }

  async remove(paymentId: string): Promise<void> {
    this.removeParams = {paymentId};
  }
}