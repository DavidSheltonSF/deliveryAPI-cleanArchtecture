import { PaymentRepository } from "../../../src/application/usecases/ports/payment-repository";
import { PaymentProps } from "../../../src/domain/entities/paymentProps";
import { MockData } from "../../_helpers/mockData";


export class SpyPaymentRepository implements PaymentRepository {
  addParams: Record<string, PaymentProps> = {};
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
    return [MockData.mockPayment()];
  }

  async findPaymentById(id: string): Promise<PaymentProps | null> {
    this.findPaymentByIdParams = {id};
    return MockData.mockPayment();
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentProps | null> {
    this.findPaymentByOrderIdParams = {orderId};
    return MockData.mockPayment();
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