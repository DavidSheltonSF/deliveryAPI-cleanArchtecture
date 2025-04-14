import { DishRepository } from "../../../src/application/usecases/ports/dish-repository";
import { Dish as DishData } from "../../../src/domain/entities/dish";
import { MockData } from "../../_helpers/mockData";


export class SpyDishRepository implements DishRepository {
  addParams: Record<string, DishData> = {};
  findDishByIdParams: {
    id?: string,
  } = {};
  updateParams: {
    dishId?: string,
    dish?: Omit<DishData, '_id'>,
  } = {};
  removeParams: {
    dishId?: string,
  } = {};


  async findAllDishs(): Promise<DishData[]> {
    return [MockData.mockDish()];
  }

  async findDishById(id: string): Promise<DishData | null> {
    this.findDishByIdParams = {id};
    return MockData.mockDish();
  }

  async add(dish: DishData): Promise<void> {
    this.addParams = { dish };
  }

  async update(dishId: string, dish: Omit<DishData, '_id'>): Promise<void> {
    this.updateParams = {
      dishId,
      dish
    };
  }

  async remove(dishId: string): Promise<void> {
    this.removeParams = {dishId};
  }

}