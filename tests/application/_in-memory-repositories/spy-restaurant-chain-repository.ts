import { RestaurantChainRepository } from "../../../src/application/usecases/ports/restaurant-chain-repository";
import { RestaurantChainProps } from "../../../src/domain/entities/restaurantChainProps";

export class SpyRestaurantChainRepository implements RestaurantChainRepository {
  
  restaurantChainDatabase: RestaurantChainProps[] = [];
  findRestaurantChainByIdParams: {
    id?: string,
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
    restaurantChainId?: string,
  } = {};

  async findAllRestaurantChains(): Promise<RestaurantChainProps[]> {
      return this.restaurantChainDatabase;
  }
  
  async findRestaurantChainById(id: string): Promise<RestaurantChainProps | null> {
    this.findRestaurantChainByIdParams = { id };
    for (let i=0; i<this.restaurantChainDatabase.length; i++){
      if (this.restaurantChainDatabase[i]._id?.toString() == id){
        return this.restaurantChainDatabase[i];
      }
    }
    return null;
  }

  async findRestaurantChainByAdminId(adminId: string): Promise<RestaurantChainProps | null> {
    this.findRestaurantChainByAdminIdParams = { adminId };
    for (let i=0; i<this.restaurantChainDatabase.length; i++){
      if (this.restaurantChainDatabase[i].adminId == adminId){
        return this.restaurantChainDatabase[i];
      }
    }
    return null;
  }

  async exists(id: string): Promise<boolean>{
    for (let i=0; i<this.restaurantChainDatabase.length; i++){
      if (this.restaurantChainDatabase[i]._id?.toString() == id){
        return true;
      }
    }

    return false
  }

  async add(restaurantChain: RestaurantChainProps): Promise<void> {
    this.addParams = { restaurantChain };
  }

  async update(restaurantChainId: string, restaurantChain: Omit<RestaurantChainProps, '_id'>): Promise<void> {
    this.updateParams = {
      restaurantChainId,
      restaurantChain
    };
  }

  async remove(restaurantChainId: string): Promise<void> {
    this.removeParams = {restaurantChainId};
  }

}