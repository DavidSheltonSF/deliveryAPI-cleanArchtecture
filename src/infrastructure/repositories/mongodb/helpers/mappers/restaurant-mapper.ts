import { WithId, Document } from "mongodb";
import { RestaurantProps } from "../../../../../domain/entities/restaurant-props";

export class RestaurantMapper {
  /* Converts database documents into Restaurant type objects */
  static toRestaurant (data: WithId<Document>): RestaurantProps {
    const {
        _id,
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