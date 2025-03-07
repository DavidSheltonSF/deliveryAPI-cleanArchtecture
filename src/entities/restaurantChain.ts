export interface RestaurantChain {
  name: string,
  cnpj: string,
  iconUrl: string,
  ownerId: string,
}

export class RestaurantChainCast {
  /* Converts database documents into RestaurantChain type objects */
  static toRestaurantChain (data: Record<string, any>): RestaurantChain {
    const {
        name,
        cnpj,
        iconUrl,
        ownerId,
    } = data;

    return {
      name,
      cnpj,
      iconUrl,
      ownerId,
    }
  }
}