import { AddressProps } from "./validation/_interfaces";
import { DishProps } from "./dish-props";
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