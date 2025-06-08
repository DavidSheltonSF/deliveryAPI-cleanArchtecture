import { WithId, Document } from "mongodb";
import { DishProps } from "../../../../../domain/entities/dish-props";
import { mongoHelper } from "../mongo-helper";

export class DishMapper {
  /* Converts database documents into Dish type objects */
  static toDish (data: WithId<Document>): DishProps {
    const id = data._id.toString();
    const {
        name,
        description,
        price,
        restaurantId,
        imageUrl,
    } = data;

    return {
      id,
      name,
      description,
      price,
      restaurantId,
      imageUrl,
    };
  }

  static toDishDocument(data: DishProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data.id);
    const {
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