import {Restaurant as RestaurantData} from '../../../domain/entities/restaurant';

export interface RestaurantRepository {
  findAllRestaurants: () => Promise<RestaurantData[]>
  findRestaurantById: (restaurantId: string) => Promise<RestaurantData | null>
  findRestaurantByAdminId: (adminId: string) => Promise<RestaurantData | null>
  findRestaurantByZipCode: (zipCode: string) => Promise<RestaurantData | null>
  add: (restaurant: RestaurantData) => Promise<void>
  remove: (restaurantId: string) => Promise<void>
  update: (restaurantId: string, restaurantData: Omit<RestaurantData, '_id'>) => Promise<void>
}