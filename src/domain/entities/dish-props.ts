import { ObjectId } from 'mongodb';

export interface DishProps {
  _id: ObjectId | null,
  name: string,
  description: string,
  price: number,
  restaurantId: string,
  imageUrl?: string,
}

export class DishMapper {
  /* Converts database documents into Dish type objects */
  static toDish (data: Record<string, any>): DishProps {
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