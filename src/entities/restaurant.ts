import { Address } from "./validators/_interfaces"

export interface Restaurant {
  restaurantChainId: string,
  adminId: string,
  isOpen: boolean,
  phone: string
  imageUrl: string,
  address: Address
}

export class RestaurantCast {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: Record<string, any>): Restaurant {
    const {
        restaurantChainId,
        adminId,
        isOpen,
        phone,
        imageUrl,
        address,
    } = data;

    return {
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    }
  }
}