import { PaymentMethod } from "./validators/_enums";

export interface Payment {
  orderId: string,
  paymentMethod: PaymentMethod,
  status: number,
}