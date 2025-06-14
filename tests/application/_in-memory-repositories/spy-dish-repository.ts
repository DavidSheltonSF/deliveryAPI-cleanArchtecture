import { DishRepository } from "../../../src/application/_ports/dish-repository";
import { DishProps } from "../../../src/domain/entities/dish-props";

export class SpyDishRepository implements DishRepository {
  dishDatabase: DishProps[] = [];
  addParams: {
    newDish?: DishProps;
  } = {};
  findDishByIdParams: {
    id?: string;
  } = {};
  updateParams: {
    dishId?: string;
    dish?: Omit<DishProps, 'id'>;
  } = {};
  removeParams: {
    dishId?: string;
  } = {};

  async findAllDishs(): Promise<DishProps[]> {
    return this.dishDatabase;
  }

  async findDishById(id: string): Promise<DishProps | null> {
    this.findDishByIdParams = { id };
    for (let i = 0; i < this.dishDatabase.length; i++) {
      if (this.dishDatabase[i].id?.toString() === id) {
        return this.dishDatabase[i];
      }
    }
    return null;
  }

  async add(newDish: DishProps): Promise<void> {
    this.addParams = { newDish };
  }

  async update(dishId: string, dish: Omit<DishProps, 'id'>): Promise<void> {
    this.updateParams = {
      dishId,
      dish,
    };
  }

  async remove(dishId: string): Promise<void> {
    this.removeParams = { dishId };
  }
}