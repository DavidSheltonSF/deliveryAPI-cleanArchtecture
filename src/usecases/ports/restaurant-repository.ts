import {Restaurant as RestaurantData} from '../../entities/restaurant';

export interface RestaurantRepository {
  findAllRestaurants: () => Promise<RestaurantData[]>
  findRestaurantById: (restaurantId: string) => Promise<RestaurantData>
  findRestaurantByOwnerId: (restaurantId: string) => Promise<RestaurantData>
  add: (restaurant: RestaurantData) => Promise<void>
  remove: (restaurantId: string) => Promise<void>
  update: (restaurantId: string, restaurantData: RestaurantData) => Promise<void>
}