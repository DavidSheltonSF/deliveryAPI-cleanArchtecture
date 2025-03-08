import { RestaurantChainRepository } from "usecases/ports/restaurant-chain-repository";
import { RestaurantChain as RestaurantChain } from "entities/restaurantChain";
import { RestaurantChainCast } from "../../../entities/restaurantChain";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbRestaurantChainRepository implements RestaurantChainRepository {
  
  async findAllRestaurantChains (): Promise<RestaurantChain[]> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    const result = await restaurantchainCollection.find().toArray();

    if (result){
      const restaurantchains = result.map((elem) => {
        return RestaurantChainCast.toRestaurantChain(elem);
      });

      return restaurantchains;
    }
    return [];
  }

  async findRestaurantChainById (restaurantChain: string): Promise<RestaurantChain | null> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(restaurantChain);
    const result = await restaurantchainCollection?.findOne({_id: objId});

    if (result){
      return RestaurantChainCast.toRestaurantChain(result);
    }

    return null;
  }

  async findRestaurantChainByAdminId (adminId: string): Promise<RestaurantChain | null> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    const result = await restaurantchainCollection?.findOne({adminId: adminId});

    if (result){
      return RestaurantChainCast.toRestaurantChain(result);
    }

    return null;
  }

  async add (restaurantchain: RestaurantChain): Promise<void> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainCollection?.insertOne(restaurantchain);
  }

  async update (restaurantChainId: string, restaurantChain: RestaurantChain): Promise<void> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainCollection.updateOne(
      {_id: mongoHelper.toObjectId(restaurantChainId)},
      {$set: restaurantChain}
    );
  }

  async remove (restaurantChain: string): Promise<void> {
    const restaurantchainCollection = mongoHelper.getCollection('restaurantChain');
    await restaurantchainCollection.deleteOne(
      {_id: mongoHelper.toObjectId(restaurantChain)}
    );
  }
}