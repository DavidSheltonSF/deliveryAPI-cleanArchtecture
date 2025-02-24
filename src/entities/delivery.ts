import { DeliveryStatus } from "./validators/_enums"

export interface Delivery {
  orderId: string,
  driverId: string
  status: DeliveryStatus,
  timeEstimate: number
}