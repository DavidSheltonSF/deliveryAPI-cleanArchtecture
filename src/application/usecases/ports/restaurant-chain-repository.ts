import {RestaurantChain as RestaurantChainData} from '../../../domain/entities/restaurantChain';

export interface RestaurantChainRepository {
  findAllRestaurantChains: () => Promise<RestaurantChainData[]>
  findRestaurantChainById: (restaurantchainId: string) => Promise<RestaurantChainData>
  findRestaurantChainByAdminId: (adminId: string) => Promise<RestaurantChainData>
  add: (restaurantchain: RestaurantChainData) => Promise<void>
  remove: (restaurantchainId: string) => Promise<void>
  update: (restaurantchainId: string, restaurantchainData: Omit<RestaurantChainData, '_id'>) => Promise<void>
}