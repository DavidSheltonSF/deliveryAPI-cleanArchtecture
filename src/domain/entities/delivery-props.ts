export interface DeliveryProps {
  id?: string;
  orderId: string;
  driverId: string;
  status: string;
  timeEstimateInMinutes: number;
}
