import { ObjectId } from 'mongodb';

export interface RestaurantChain {
  _id?: ObjectId,
  name: string,
  cnpj: string,
  iconUrl: string,
  adminId: string,
}

export class RestaurantChainCast {
  /* Converts database documents into RestaurantChain type objects */
  static toRestaurantChain (data: Record<string, any>): RestaurantChain {
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