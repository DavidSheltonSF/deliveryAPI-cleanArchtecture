import { RestaurantChainProps } from "../../../../../domain/entities/restaurant-chain-props";

export class RestaurantChainMapper {
  /* Converts database documents into RestaurantChain type objects */
  static toRestaurantChain (data: Record<string, any>): RestaurantChainProps {
    const {
        _id,
        name,
        cnpj,
        iconUrl,
        adminId,
    } = data;

    return {
      _id,
      name,
      cnpj,
      iconUrl,
      adminId,
    }
  }
}