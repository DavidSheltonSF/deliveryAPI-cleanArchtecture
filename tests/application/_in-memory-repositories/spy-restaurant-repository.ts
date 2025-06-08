import { RestaurantRepository } from "../../../src/application/_ports/restaurant-repository";
import { RestaurantProps } from "../../../src/domain/entities/restaurant-props";

export class SpyRestaurantRepository implements RestaurantRepository {
  restaurantDatabase: RestaurantProps[] = [];
  findRestaurantByIdParams: {
    id?: string,
  } = {};
  findRestaurantByAdminIdParams: {
    adminId?: string,
  } = {};
  findRestaurantByZipCodeParams: {
    zipCode?: string,
  } = {};
  addParams: Record<string, RestaurantProps> = {};
  updateParams: {
    restaurantId?: string,
    restaurant?: Omit<RestaurantProps, 'id'>,
  } = {};
  removeParams: {
    restaurantId?: string,
  } = {};

  async findAllRestaurants(): Promise<RestaurantProps[]> {
    return this.restaurantDatabase;
  }

 async findRestaurantById(id: string): Promise<RestaurantProps | null> {
     this.findRestaurantByIdParams = { id };
     for (let i=0; i<this.restaurantDatabase.length; i++){
       if (this.restaurantDatabase[i].id?.toString() == id){
         return this.restaurantDatabase[i];
       }
     }
     return null;
   }

  async findRestaurantByAdminId(adminId: string): Promise<RestaurantProps | null> {
     this.findRestaurantByAdminIdParams = { adminId };
     for (let i=0; i<this.restaurantDatabase.length; i++){
       if (this.restaurantDatabase[i].adminId?.toString() == adminId){
         return this.restaurantDatabase[i];
       }
     }
     return null;
   }

  async findRestaurantByZipCode(zipCode: string): Promise<RestaurantProps | null> {
     this.findRestaurantByZipCodeParams = { zipCode };
     for (let i=0; i<this.restaurantDatabase.length; i++){
       if (this.restaurantDatabase[i].address.zipCode?.toString() == zipCode){
         return this.restaurantDatabase[i];
       }
     }
     return null;
   }

  async add(restaurant: RestaurantProps): Promise<void> {
    this.addParams = { restaurant };
  }

  async update(restaurantId: string, restaurant: Omit<RestaurantProps, 'id'>): Promise<void> {
    this.updateParams = {
      restaurantId,
      restaurant
    };
  }

  async remove(restaurantId: string): Promise<void> {
    this.removeParams = {restaurantId};
  }

}