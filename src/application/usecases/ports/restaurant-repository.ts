import { RestaurantProps } from '../../../domain/entities/restaurant-props';

export interface RestaurantRepository {
  findAllRestaurants: () => Promise<RestaurantProps[]>;
  findRestaurantById: (restaurantId: string) => Promise<RestaurantProps | null>;
  add: (restaurant: RestaurantProps) => Promise<void>;
  remove: (restaurantId: string) => Promise<void>;
  update: (restaurantId: string, restaurantData: Omit<RestaurantProps, '_id'>) => Promise<void>;
}