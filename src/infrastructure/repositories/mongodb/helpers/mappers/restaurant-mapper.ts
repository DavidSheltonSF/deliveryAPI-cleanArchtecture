import { WithId, Document } from "mongodb";
import { RestaurantProps } from "../../../../../domain/entities/restaurant-props";
import { mongoHelper } from "../mongo-helper";

export class RestaurantMapper {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: WithId<Document>): RestaurantProps {
    const _id = data._id.toString();
    const {
        restaurantChainId,
        adminId,
        isOpen,
        phone,
        imageUrl,
        address,
    } = data;

    return {
      _id,
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    }
  }

  static toRestaurantDocument(data: RestaurantProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data._id);
    const {
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    } = data;

    return {
      _id,
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    }
  }
}