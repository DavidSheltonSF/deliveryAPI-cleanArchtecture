export interface RestaurantChain {
  name: string,
  cnpj: string,
  iconUrl: string,
  adminId: string,
}

export class RestaurantChainCast {
  /* Converts database documents into RestaurantChain type objects */
  static toRestaurantChain (data: Record<string, any>): RestaurantChain {
    const {
        name,
        cnpj,
        iconUrl,
        adminId,
    } = data;

    return {
      name,
      cnpj,
      iconUrl,
      adminId,
    }
  }
}