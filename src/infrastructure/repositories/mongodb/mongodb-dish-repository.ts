import { DishRepository } from '../../../application/_ports/dish-repository';
import { DishProps } from '../../../domain/entities/dish-props';
import { DishMapper } from './helpers/mappers/dish-mapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbDishRepository implements DishRepository {
  async findAllDishs(): Promise<DishProps[]> {
    const dishCollection = mongoHelper.getCollection('dish');
    const result = await dishCollection.find().toArray();

    if (result) {
      const dishs = result.map((elem) => {
        return DishMapper.toDish(elem);
      });

      return dishs;
    }
    return [];
  }

  async findDishById(dish: string): Promise<DishProps | null> {
    const dishCollection = mongoHelper.getCollection('dish');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(dish);
    const result = await dishCollection?.findOne({ _id: objId });

    if (result) {
      return DishMapper.toDish(result);
    }

    return null;
  }

  async add(dish: DishProps): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection?.insertOne(DishMapper.toDishDocument(dish));
  }

  async update(dishId: string, dish: Omit<DishProps, 'id'>): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection.updateOne(
      { _id: mongoHelper.toObjectId(dishId) },
      { $set: dish }
    );
  }

  async remove(dish: string): Promise<void> {
    const dishCollection = mongoHelper.getCollection('dish');
    await dishCollection.deleteOne({ _id: mongoHelper.toObjectId(dish) });
  }
}
