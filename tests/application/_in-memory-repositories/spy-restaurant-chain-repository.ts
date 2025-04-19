import { RestaurantChainRepository } from "../../../src/application/usecases/ports/restaurant-chain-repository";
import { RestaurantChainProps } from "../../../src/domain/entities/restaurantChainProps";
import { MockData } from "../../_helpers/mockData";

export class SpyRestaurantChainRepository implements RestaurantChainRepository {
  
  findRestaurantChainByIdParams: {
    restaurantChainId?: string,
  } = {};
  findRestaurantChainByAdminIdParams: {
    adminId?: string,
  } = {};
  addParams: Record<string, RestaurantChainProps> = {};
  updateParams: {
    restaurantChainId?: string,
    restaurantChain?: Omit<RestaurantChainProps, '_id'>,
  } = {};
  removeParams: {
    restaurantchainId?: string,
  } = {};

  async findAllRestaurantChains(): Promise<RestaurantChainProps[]> {
    return [MockData.mockRestaurantChain()];
  }

  async findRestaurantChainById(restaurantChainId: string): Promise<RestaurantChainProps | null> {
    this.findRestaurantChainByIdParams = {restaurantChainId};
    return MockData.mockRestaurantChain();
  }

  async findRestaurantChainByAdminId(adminId: string): Promise<RestaurantChainProps | null> {
    this.findRestaurantChainByAdminIdParams.adminId = adminId;
    return MockData.mockRestaurantChain();
  }

  async add(restaurantchain: RestaurantChainProps): Promise<void> {
    this.addParams.restaurantchain = restaurantchain;
  }

  async update(restaurantChainId: string, restaurantChain: Omit<RestaurantChainProps, '_id'>): Promise<void> {
    this.updateParams = {
      restaurantChainId,
      restaurantChain
    };
  }

  async remove(restaurantchainId: string): Promise<void> {
    this.removeParams = {restaurantchainId};
  }

}