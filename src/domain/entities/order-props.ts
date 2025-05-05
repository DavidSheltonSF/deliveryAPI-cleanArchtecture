import { AddressProps } from "./validation/_interfaces";
import { DishProps } from "./dishProps";
import { ObjectId } from "mongodb";

export interface OrderProps {
  _id: ObjectId | null,
  customerId: string,
  restaurantId: string
  dishes: Omit<DishProps, 'restaurantId' | '_id'>[],
  totalPrice: number,
  status: string,
  address: AddressProps
}

export class OrderMapper {
  /* Converts database documents into Order type objects */
  static toOrder (data: Record<string, any>): OrderProps {
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