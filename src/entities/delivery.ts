import { ObjectId } from 'mongodb';

export interface Delivery {
  _id?: ObjectId,
  orderId: string,
  driverId: string
  status: string,
  timeEstimate: number
}

export class DeliveryCast {
  /* Converts database documents into Delivery type objects */
  static toDelivery (data: Record<string, any>): Delivery {
    const {
      _id,
      orderId,
      driverId,
      status,
      timeEstimate,
    } = data;

    return {
      _id,
      orderId,
      driverId,
      status,
      timeEstimate,
    }
  }
}