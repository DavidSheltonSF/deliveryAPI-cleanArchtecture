import { DishRepository } from "../../../application/usecases/ports/dish-repository";
import { Dish as Dish } from "../../../domain/entities/dish";
import { DishMapper } from "../../../domain/entities/dish";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbDishRepository implements DishRepository {
  
  async findAllDishs (): Promise<Dish[]> {
    const dishCollection = mongoHelper.getCollection('dish');
    const result = await dishCollection.find().toArray();

    if (result){
      const dishs = result.map((elem) => {
        return DishMapper.toDish(elem);
      });

      return dishs;
    }
    return [];
  }

  async findDishById (dish: string): Promise<Dish | null> {
    const dishCollection = mongoHelper.getCollection('dish');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(dish);
    const result = await dishCollection?.findOne({_id: objId});

    if (result){
      return DishMapper.toDish(result);
    }

    return null;
  }

  async add (dish: Dish): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection?.insertOne(dish);
  }

  async update (dishId: string, dish: Omit<Dish, '_id'>): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection.updateOne(
      {_id: mongoHelper.toObjectId(dishId)},
      {$set: dish}
    );
  }

  async remove (dish: string): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection.deleteOne(
      {_id: mongoHelper.toObjectId(dish)}
    );
  }
}