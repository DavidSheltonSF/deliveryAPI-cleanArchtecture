import { DishProps } from '../../domain/entities/dish-props';

export interface DishRepository {
  findAllDishs: () => Promise<DishProps[]>;
  findDishById: (dishId: string) => Promise<DishProps | null>;
  add: (dish: DishProps) => Promise<DishProps>;
  remove: (dishId: string) => Promise<void>;
  update: (dishId: string, dishData: Omit<DishProps, '_id'>) => Promise<void>;
}