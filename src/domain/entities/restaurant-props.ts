import { AddressProps } from "./validation/_interfaces"

export interface RestaurantProps {
  _id?: string,
  restaurantChainId: string,
  adminId: string,
  isOpen: boolean,
  phone: string
  imageUrl: string,
  address: AddressProps
}