import { PaymentProps } from '../../domain/entities/payment-props';

export interface PaymentRepository {
  findAllPayments: () => Promise<PaymentProps[]>;
  findPaymentById: (paymentId: string) => Promise<PaymentProps | null>;
  add: (payment: PaymentProps) => Promise<void>;
  remove: (paymentId: string) => Promise<void>;
  update: (paymentId: string, paymentData: Omit<PaymentProps, '_id'>) => Promise<void>;
}