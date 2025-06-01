import { WithId, Document } from "mongodb";
import { OrderProps } from "../../../../../domain/entities/order-props";
import { mongoHelper } from "../mongo-helper";


export class OrderMapper {
  /* Converts database documents into Order type objects */
  static toOrder (data: WithId<Document>): OrderProps {
    const _id = data._id.toString();
    const {
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

  static toOrderDocument(data: OrderProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data._id);
    const {
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