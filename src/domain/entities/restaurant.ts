import { AddressProps } from "./validation/_interfaces"
import { ObjectId } from 'mongodb';

export interface Restaurant {
  _id: ObjectId | null,
  restaurantChainId: string,
  adminId: string,
  isOpen: boolean,
  phone: string
  imageUrl: string,
  address: AddressProps
}

export class RestaurantMapper {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: Record<string, any>): Restaurant {
    const {
        _id,
        restaurantChainId,
        adminId,
        isOpen,
        phone,
        imageUrl,
        address,
    } = data;

    return {
      _id,
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    }
  }
}