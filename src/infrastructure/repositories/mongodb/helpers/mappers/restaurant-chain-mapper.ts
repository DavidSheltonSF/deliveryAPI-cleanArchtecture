import { WithId, Document } from "mongodb";
import { RestaurantChainProps } from "../../../../../domain/entities/restaurant-chain-props";
import { mongoHelper } from "../mongo-helper";


export class RestaurantChainMapper {
  /* Converts database documents into RestaurantChain type objects */
  static toRestaurantChain (data: WithId<Document>): RestaurantChainProps {
    const _id = data._id.toString();
    const {
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

  static toRestaurantChainDocument(data: RestaurantChainProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data._id);
    const {
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