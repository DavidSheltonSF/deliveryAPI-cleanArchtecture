import { Address } from "./validators/_interfaces";
import { Product } from "./product";

export interface Order {
  costumerId: string,
  restaurantId: string
  products: Omit<Product, 'restaurantId'>[],
  totalPrice: boolean,
  status: string,
  ownerId: string,
  address: Address
}

export class OrderCast {
  /* Converts database documents into Order type objects */
  static toOrder (data: Record<string, any>): Order {
    const {
      costumerId,
      restaurantId,
      products,
      totalPrice,
      status,
      ownerId,
      address
    } = data;

    return {
      costumerId,
      restaurantId,
      products,
      totalPrice,
      status,
      ownerId,
      address
    }
  }
}