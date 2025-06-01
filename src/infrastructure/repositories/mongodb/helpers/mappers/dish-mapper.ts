import { WithId, Document } from "mongodb";
import { DishProps } from "../../../../../domain/entities/dish-props";

export class DishMapper {
  /* Converts database documents into Dish type objects */
  static toDish (data: WithId<Document>): DishProps {
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