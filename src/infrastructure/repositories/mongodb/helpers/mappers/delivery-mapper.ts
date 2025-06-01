import { DeliveryProps } from "../../../../../domain/entities/delivery-props";

export class DeliveryMapper {
  /* Converts database documents into Delivery type objects */
  static toDelivery (data: Record<string, any>): DeliveryProps {
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