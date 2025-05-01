import {Dish as DishData} from '../../../domain/entities/dishProps';

export interface DishRepository {
  findAllDishs: () => Promise<DishData[]>
  findDishById: (dishId: string) => Promise<DishData | null>
  add: (dish: DishData) => Promise<void>
  remove: (dishId: string) => Promise<void>
  update: (dishId: string, dishData: Omit<DishData, '_id'>) => Promise<void>
}