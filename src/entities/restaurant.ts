import { Address } from "./validators/_interfaces"

export interface Restaurant {
  restaurantChainId: string,
  isOpen: boolean,
  imageUrl: string,
  address: Address
}

export class RestaurantCast {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: Record<string, any>): Restaurant {
    const {
        restaurantChainId,
        isOpen,
        imageUrl,
        address,
    } = data;

    return {
      restaurantChainId,
      isOpen,
      imageUrl,
      address,
    }
  }
}