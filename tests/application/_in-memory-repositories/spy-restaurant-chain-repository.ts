import { RestaurantChainRepository } from "../../../src/application/usecases/ports/restaurant-chain-repository";
import { RestaurantChain as RestaurantChainData } from "../../../src/domain/entities/restaurantChain";
import { MockData } from "../../_helpers/mockData";

export class SpyRestaurantChainRepository implements RestaurantChainRepository {
  
  findRestaurantChainByIdParams: {
    restaurantChainId?: string,
  } = {};
  findRestaurantChainByAdminIdParams: {
    adminId?: string,
  } = {};
  addParams: Record<string, RestaurantChainData> = {};
  updateParams: {
    restaurantChainId?: string,
    restaurantChain?: Omit<RestaurantChainData, '_id'>,
  } = {};
  removeParams: {
    restaurantchainId?: string,
  } = {};

  async findAllRestaurantChains(): Promise<RestaurantChainData[]> {
    return [MockData.mockRestaurantChain()];
  }

  async findRestaurantChainById(restaurantChainId: string): Promise<RestaurantChainData | null> {
    this.findRestaurantChainByIdParams = {restaurantChainId};
    return MockData.mockRestaurantChain();
  }

  async findRestaurantChainByAdminId(adminId: string): Promise<RestaurantChainData | null> {
    this.findRestaurantChainByAdminIdParams.adminId = adminId;
    return MockData.mockRestaurantChain();
  }

  async add(restaurantchain: RestaurantChainData): Promise<void> {
    this.addParams.restaurantchain = restaurantchain;
  }

  async update(restaurantChainId: string, restaurantChain: Omit<RestaurantChainData, '_id'>): Promise<void> {
    this.updateParams = {
      restaurantChainId,
      restaurantChain
    };
  }

  async remove(restaurantchainId: string): Promise<void> {
    this.removeParams = {restaurantchainId};
  }

}