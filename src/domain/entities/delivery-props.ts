import { ObjectId } from 'mongodb';

export interface DeliveryProps {
  _id: ObjectId | null,
  orderId: string,
  driverId: string,
  status: string,
  timeEstimate: number
}