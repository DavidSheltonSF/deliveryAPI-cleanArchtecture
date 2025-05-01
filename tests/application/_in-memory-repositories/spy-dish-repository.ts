import { DishRepository } from "../../../src/application/usecases/ports/dish-repository";
import { DishProps } from "../../../src/domain/entities/dishProps";
import { MockData } from "../../_helpers/mockData";


export class SpyDishRepository implements DishRepository {
  addParams: Record<string, DishProps> = {};
  findDishByIdParams: {
    id?: string,
  } = {};
  updateParams: {
    dishId?: string,
    dish?: Omit<DishProps, '_id'>,
  } = {};
  removeParams: {
    dishId?: string,
  } = {};


  async findAllDishs(): Promise<DishProps[]> {
    return [MockData.mockDish()];
  }

  async findDishById(id: string): Promise<DishProps | null> {
    this.findDishByIdParams = {id};
    return MockData.mockDish();
  }

  async add(dish: DishProps): Promise<void> {
    this.addParams = { dish };
  }

  async update(dishId: string, dish: Omit<DishProps, '_id'>): Promise<void> {
    this.updateParams = {
      dishId,
      dish
    };
  }

  async remove(dishId: string): Promise<void> {
    this.removeParams = {dishId};
  }

}