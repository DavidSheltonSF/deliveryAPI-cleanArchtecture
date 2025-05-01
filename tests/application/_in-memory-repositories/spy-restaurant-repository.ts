import { RestaurantRepository } from "../../../src/application/usecases/ports/restaurant-repository";
import { RestaurantProps } from "../../../src/domain/entities/restaurantProps";
import { MockData } from "../../_helpers/mockData";

export class SpyRestaurantRepository implements RestaurantRepository {
  
  findRestaurantByIdParams: {
    restaurantId?: string,
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
    restaurant?: Omit<RestaurantProps, '_id'>,
  } = {};
  removeParams: {
    restaurantId?: string,
  } = {};

  async findAllRestaurants(): Promise<RestaurantProps[]> {
    return [MockData.mockRestaurant()];
  }

  async findRestaurantById(restaurantId: string): Promise<RestaurantProps | null> {
    this.findRestaurantByIdParams = {restaurantId};
    return MockData.mockRestaurant();
  }

  async findRestaurantByAdminId(adminId: string): Promise<RestaurantProps | null> {
    this.findRestaurantByAdminIdParams = { adminId };
    return MockData.mockRestaurant();
  }

  async findRestaurantByZipCode(zipCode: string): Promise<RestaurantProps | null> {
    this.findRestaurantByZipCodeParams = { zipCode };
    return MockData.mockRestaurant();
  }

  async add(restaurant: RestaurantProps): Promise<void> {
    this.addParams = { restaurant };
  }

  async update(restaurantId: string, restaurant: Omit<RestaurantProps, '_id'>): Promise<void> {
    this.updateParams = {
      restaurantId,
      restaurant
    };
  }

  async remove(restaurantId: string): Promise<void> {
    this.removeParams = {restaurantId};
  }

}