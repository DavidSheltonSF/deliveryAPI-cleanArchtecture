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