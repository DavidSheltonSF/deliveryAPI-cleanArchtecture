import { AddressProps } from "./validation/_interfaces"
import { ObjectId } from 'mongodb';

export interface RestaurantProps {
  _id: ObjectId | null,
  restaurantChainId: string,
  adminId: string,
  isOpen: boolean,
  phone: string
  imageUrl: string,
  address: AddressProps
}