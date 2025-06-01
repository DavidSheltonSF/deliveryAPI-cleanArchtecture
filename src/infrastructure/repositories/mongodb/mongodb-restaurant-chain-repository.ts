import { RestaurantChainRepository } from "../../../application/_ports/restaurant-chain-repository";
import { RestaurantChainProps } from "../../../domain/entities/restaurant-chain-props";
import { RestaurantChainMapper } from "./helpers/mappers/restaurant-chain-mapper";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbRestaurantChainRepository implements RestaurantChainRepository {
  
  async findAllRestaurantChains (): Promise<RestaurantChainProps[]> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    const result = await restaurantchainpropsCollection.find().toArray();

    if (result){
      const restaurantchainpropss = result.map((elem) => {
        return RestaurantChainMapper.toRestaurantChain(elem);
      });

      return restaurantchainpropss;
    }
    return [];
  }

  async findRestaurantChainById (restaurantChainProps: string): Promise<RestaurantChainProps | null> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(restaurantChainProps);
    const result = await restaurantchainpropsCollection?.findOne({_id: objId});

    if (result){
      return RestaurantChainMapper.toRestaurantChain(result);
    }

    return null;
  }

  async findRestaurantChainByAdminId (adminId: string): Promise<RestaurantChainProps | null> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    const result = await restaurantchainpropsCollection?.findOne({adminId: adminId});

    if (result){
      return RestaurantChainMapper.toRestaurantChain(result);
    }

    return null;
  }

  async add (restaurantchainprops: RestaurantChainProps): Promise<void> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainpropsCollection?.insertOne(RestaurantChainMapper.toRestaurantChainDocument(restaurantchainprops));
  }

  async update (restaurantChainPropsId: string, restaurantChainProps: Omit<RestaurantChainProps, '_id'>): Promise<void> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainpropsCollection.updateOne(
      {_id: mongoHelper.toObjectId(restaurantChainPropsId)},
      {$set: restaurantChainProps}
    );
  }

  async remove (restaurantChainProps: string): Promise<void> {
    const restaurantchainpropsCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainpropsCollection.deleteOne(
      {_id: mongoHelper.toObjectId(restaurantChainProps)}
    );
  }
}