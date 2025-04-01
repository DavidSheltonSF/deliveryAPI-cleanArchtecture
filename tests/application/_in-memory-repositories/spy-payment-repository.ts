import { PaymentRepository } from "../../../src/application/usecases/ports/payment-repository";
import { Payment as PaymentData } from "../../../src/domain/entities/payment";
import { MockData } from "../../_helpers/mockData";


export class SpyPaymentRepository implements PaymentRepository {
  addParams: Record<string, PaymentData> = {};
  findPaymentByIdParams: {
    id?: string,
  } = {};
  findPaymentByOrderIdParams: {
    orderId?: string,
  } = {};
  updateParams: {
    paymentId?: string,
    payment?: Omit<PaymentData, '_id'>,
  } = {};
  removeParams: {
    paymentId?: string,
  } = {};


  async findAllPayments(): Promise<PaymentData[]> {
    return [MockData.mockPayment()];
  }

  async findPaymentById(id: string): Promise<PaymentData | null> {
    this.findPaymentByIdParams = {id};
    return MockData.mockPayment();
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentData | null> {
    this.findPaymentByOrderIdParams = {orderId};
    return MockData.mockPayment();
  }

  async add(payment: PaymentData): Promise<void> {
    this.addParams = { payment };
  }

  async update(paymentId: string, payment: Omit<PaymentData, '_id'>): Promise<void> {
    this.updateParams = {
      paymentId,
      payment
    };
  }

  async remove(paymentId: string): Promise<void> {
    this.removeParams = {paymentId};
  }

}