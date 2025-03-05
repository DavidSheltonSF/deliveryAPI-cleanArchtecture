import { DeliveryStatus } from "./validators/_enums"

export interface Delivery {
  deliveryId: string,
  driverId: string
  status: DeliveryStatus,
  timeEstimate: number
}

export class DeliveryCast {
  /* Converts database documents into Delivery type objects */
  static toDelivery (data: Record<string, any>): Delivery {
    const {
      deliveryId,
      driverId,
      status,
      timeEstimate,
    } = data;

    return {
      deliveryId,
      driverId,
      status,
      timeEstimate,
    }
  }
}