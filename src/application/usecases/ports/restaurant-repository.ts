import { RestaurantProps } from '../../../domain/entities/restaurantProps';

export interface RestaurantRepository {
  findAllRestaurants: () => Promise<RestaurantProps[]>
  findRestaurantById: (restaurantId: string) => Promise<RestaurantProps | null>
  findRestaurantByAdminId: (adminId: string) => Promise<RestaurantProps | null>
  findRestaurantByZipCode: (zipCode: string) => Promise<RestaurantProps | null>
  add: (restaurant: RestaurantProps) => Promise<void>
  remove: (restaurantId: string) => Promise<void>
  update: (restaurantId: string, restaurantData: Omit<RestaurantProps, '_id'>) => Promise<void>
}