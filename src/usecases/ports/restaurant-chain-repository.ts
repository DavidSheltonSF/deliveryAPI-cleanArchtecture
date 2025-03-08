import {RestaurantChain as RestaurantChainData} from '../../entities/restaurantChain';

export interface RestaurantChainRepository {
  findAllRestaurantChains: () => Promise<RestaurantChainData[]>
  findRestaurantChainById: (restaurantchainId: string) => Promise<RestaurantChainData>
  findRestaurantChainByAdminId: (adminId: string) => Promise<RestaurantChainData>
  findRestaurantChainByZipCode: (zipCode: string) => Promise<RestaurantChainData>
  add: (restaurantchain: RestaurantChainData) => Promise<void>
  remove: (restaurantchainId: string) => Promise<void>
  update: (restaurantchainId: string, restaurantchainData: RestaurantChainData) => Promise<void>
}