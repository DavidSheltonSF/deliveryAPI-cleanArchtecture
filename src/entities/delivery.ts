import { DeliveryStatus } from "./validators/_enums"
import { ObjectId } from 'mongodb';

export interface Delivery {
  _id?: ObjectId,
  deliveryId: string,
  driverId: string
  status: DeliveryStatus,
  timeEstimate: number
}

export class DeliveryCast {
  /* Converts database documents into Delivery type objects */
  static toDelivery (data: Record<string, any>): Delivery {
    const {
      _id,
      deliveryId,
      driverId,
      status,
      timeEstimate,
    } = data;

    return {
      _id,
      deliveryId,
      driverId,
      status,
      timeEstimate,
    }
  }
}