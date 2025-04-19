import { ObjectId } from 'mongodb';

export interface RestaurantChainProps {
  _id: ObjectId | null,
  name: string,
  cnpj: string,
  iconUrl: string,
  adminId: string,
}

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