import { AddressProps } from "./validators/_interfaces";
import { Dish } from "./dish";
import { ObjectId } from "mongodb";

export interface Order {
  _id: ObjectId | null,
  customerId: string,
  restaurantId: string
  dishes: Omit<Dish, 'restaurantId' | '_id'>[],
  totalPrice: number,
  status: string,
  address: AddressProps
}

export class OrderMapper {
  /* Converts database documents into Order type objects */
  static toOrder (data: Record<string, any>): Order {
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