import { RestaurantProps } from '../../domain/entities/restaurant-props';

export interface RestaurantRepository {
  findAllRestaurants: () => Promise<RestaurantProps[]>;
  findRestaurantById: (restaurantId: string) => Promise<RestaurantProps | null>;
  add: (newRestaurant: RestaurantProps) => Promise<RestaurantProps>;
  remove: (restaurantId: string) => Promise<void>;
  update: (
    restaurantId: string,
    restaurantData: Omit<RestaurantProps, '_id'>
  ) => Promise<void>;
}