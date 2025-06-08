export interface DeliveryProps {
  _id?: string,
  orderId: string,
  driverId: string,
  status: string,
  timeEstimateInMinutes: number
}