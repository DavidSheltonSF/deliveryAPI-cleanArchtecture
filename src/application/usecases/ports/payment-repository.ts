import {Payment as PaymentData} from '../../../domain/entities/payment';

export interface PaymentRepository {
  findAllPayments: () => Promise<PaymentData[]>
  findPaymentById: (paymentId: string) => Promise<PaymentData | null>
  findPaymentByOrderId: (paymentId: string) => Promise<PaymentData | null>
  add: (payment: PaymentData) => Promise<void>
  remove: (paymentId: string) => Promise<void>
  update: (paymentId: string, paymentData: Omit<PaymentData, '_id'>) => Promise<void>
}