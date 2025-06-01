import { DishProps } from "../../../../../domain/entities/dish-props";

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