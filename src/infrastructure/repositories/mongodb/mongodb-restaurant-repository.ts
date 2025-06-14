import { RestaurantRepository } from '../../../application/_ports/restaurant-repository';
import { RestaurantProps } from '../../../domain/entities/restaurant-props';
import { MongodbMapper } from './helpers/MongodbMapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbRestaurantRepository implements RestaurantRepository {
  async findAllRestaurants(): Promise<RestaurantProps[]> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    const result = await restaurantCollection.find().toArray();

    if (result) {
      const restaurants = result.map((elem) => {
        return MongodbMapper.toRestaurant(elem);
      });

      return restaurants;
    }
    return [];
  }

  async findRestaurantById(
    restaurantId: string
  ): Promise<RestaurantProps | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(restaurantId);
    const result = await restaurantCollection?.findOne({ _id: objId });

    if (result) {
      return MongodbMapper.toRestaurant(result);
    }

    return null;
  }

  async findRestaurantByAdminId(
    adminId: string
  ): Promise<RestaurantProps | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    const result = await restaurantCollection?.findOne({ adminId: adminId });

    if (result) {
      return MongodbMapper.toRestaurant(result);
    }

    return null;
  }

  async findRestaurantByZipCode(
    zipCode: string
  ): Promise<RestaurantProps | null> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');

    const result = await restaurantCollection?.findOne({
      'address.zipCode': zipCode,
    });

    if (result) {
      return MongodbMapper.toRestaurant(result);
    }

    return null;
  }

  async add(newRestaurant: Omit<RestaurantProps, 'id'>): Promise<RestaurantProps> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');

    const newRestaurantId = await restaurantCollection
      .insertOne(MongodbMapper.toMongodbDocument(newRestaurant))
      .then((result) => result.insertedId.toString());

    return {
      id: newRestaurantId,
      ...newRestaurant
    }
  }

  async update(
    restaurantId: string,
    restaurantProps: Partial<RestaurantProps>
  ): Promise<void> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    await restaurantCollection.updateOne(
      { _id: mongoHelper.toObjectId(restaurantId) },
      { $set: restaurantProps }
    );
  }

  async remove(restaurantId: string): Promise<void> {
    const restaurantCollection = mongoHelper.getCollection('restaurants');
    await restaurantCollection.deleteOne({
      _id: mongoHelper.toObjectId(restaurantId),
    });
  }
}
