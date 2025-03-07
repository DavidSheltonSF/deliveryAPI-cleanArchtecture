import { RestaurantRepository } from "usecases/ports/restaurant-repository";
import { Restaurant as RestaurantData } from "entities/restaurant";
import { RestaurantCast } from "../../../entities/restaurant";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbRestaurantRepository implements RestaurantRepository {
  
  async findAllRestaurants (): Promise<RestaurantData[]> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    const result = await restaurantCollection.find().toArray();

    if (result){
      const restaurants = result.map((elem) => {
        return RestaurantCast.toRestaurant(elem);
      });

      return restaurants;
    }
    return [];
  }

  async findRestaurantById (restaurantId: string): Promise<RestaurantData | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(restaurantId);
    const result = await restaurantCollection?.findOne({_id: objId});

    if (result){
      return RestaurantCast.toRestaurant(result);
    }

    return null;
  }

  async findRestaurantByAdminId (adminId: string): Promise<RestaurantData | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    const result = await restaurantCollection?.findOne({adminId: adminId});

    if (result){
      return RestaurantCast.toRestaurant(result);
    }

    return null;
  }

  async findRestaurantByZipCode (zipCode: string): Promise<RestaurantData | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');

    const result = await restaurantCollection?.findOne({"address.zipCode": zipCode});

    if (result){
      return RestaurantCast.toRestaurant(result);
    }

    return null;
  }

  async add (restaurant: RestaurantData): Promise<void> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    await restaurantCollection?.insertOne(restaurant);
  }

  async update (restaurantId: string, restaurantData: RestaurantData): Promise<void> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    await restaurantCollection.updateOne(
      {_id: mongoHelper.toObjectId(restaurantId)},
      {$set: restaurantData}
    );
  }

  async remove (restaurantId: string): Promise<void> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    await restaurantCollection.deleteOne(
      {_id: mongoHelper.toObjectId(restaurantId)}
    );
  }
}