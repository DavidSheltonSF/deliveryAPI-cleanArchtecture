import { RestaurantChainProps } from '../../../domain/entities/restaurantChainProps';

export interface RestaurantChainRepository {
  findAllRestaurantChains: () => Promise<RestaurantChainProps[]>
  findRestaurantChainById: (restaurantchainId: string) => Promise<RestaurantChainProps | null>
  findRestaurantChainByAdminId: (adminId: string) => Promise<RestaurantChainProps | null>
  add: (restaurantchain: RestaurantChainProps) => Promise<void>
  remove: (restaurantchainId: string) => Promise<void>
  update: (restaurantchainId: string, restaurantchainData: Omit<RestaurantChainProps, '_id'>) => Promise<void>
}