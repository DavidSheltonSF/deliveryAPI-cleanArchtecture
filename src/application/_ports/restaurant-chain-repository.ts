import { RestaurantChainProps } from '../../domain/entities/restaurant-chain-props';

export interface RestaurantChainRepository {
  findAllRestaurantChains: () => Promise<RestaurantChainProps[]>;
  findRestaurantChainById: (
    restaurantchainId: string
  ) => Promise<RestaurantChainProps | null>;
  add: (newRestaurantChain: RestaurantChainProps) => Promise<RestaurantChainProps>;
  remove: (restaurantchainId: string) => Promise<void>;
  update: (
    restaurantchainId: string,
    restaurantchainData: Omit<RestaurantChainProps, '_id'>
  ) => Promise<void>;
}
