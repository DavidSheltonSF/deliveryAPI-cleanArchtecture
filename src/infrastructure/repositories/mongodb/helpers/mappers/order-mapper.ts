import { WithId, Document } from "mongodb";
import { OrderProps } from "../../../../../domain/entities/order-props";


export class OrderMapper {
  /* Converts database documents into Order type objects */
  static toOrder (data: WithId<Document>): OrderProps {
    const {
      _id,
      customerId,
      restaurantId,
      dishes,
      totalPrice,
      status,
      address
    } = data;

    return {
      _id,
      customerId,
      restaurantId,
      dishes,
      totalPrice,
      status,
      address
    }
  }
}