import { Address } from "./validators/_interfaces";
import { Product } from "./product";
import { ObjectId } from "mongodb";

export interface Order {
  _id?: ObjectId,
  customerId: string,
  restaurantId: string
  products: Omit<Product, 'restaurantId'>[],
  totalPrice: number,
  status: string,
  address: Address
}

export class OrderCast {
  /* Converts database documents into Order type objects */
  static toOrder (data: Record<string, any>): Order {
    const {
      _id,
      customerId,
      restaurantId,
      products,
      totalPrice,
      status,
      address
    } = data;

    return {
      _id,
      customerId,
      restaurantId,
      products,
      totalPrice,
      status,
      address
    }
  }
}