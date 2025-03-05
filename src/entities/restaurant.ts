import { Address } from "./validators/_interfaces"

export interface Restaurant {
  name: string,
  cnpj: string,
  isOpen: boolean,
  imageUrl: string,
  ownerId: string,
  address: Address
}

export class RestaurantCast {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: Record<string, any>): Restaurant {
    const {
        name,
        cnpj,
        isOpen,
        imageUrl,
        ownerId,
        address,
    } = data;

    return {
      name,
      cnpj,
      isOpen,
      imageUrl,
      ownerId,
      address,
    }
  }
}