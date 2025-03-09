import { Address } from "./validators/_interfaces";
import { Product } from "./product";

export interface Order {
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
      customerId,
      restaurantId,
      products,
      totalPrice,
      status,
      address
    } = data;

    return {
      customerId,
      restaurantId,
      products,
      totalPrice,
      status,
      address
    }
  }
}