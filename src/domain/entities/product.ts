import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId,
  name: string,
  description: string,
  price: number,
  restaurantId: string,
  imageUrl?: string,
}

export class ProductMapper {
  /* Converts database documents into Product type objects */
  static toProduct (data: Record<string, any>): Product {
    const {
        _id,
        name,
        description,
        price,
        restaurantId,
        imageUrl,
    } = data;

    return {
      _id,
      name,
      description,
      price,
      restaurantId,
      imageUrl,
    }
  }
}