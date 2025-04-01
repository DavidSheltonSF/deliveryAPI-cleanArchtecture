import { RestaurantRepository } from "../../../src/application/usecases/ports/restaurant-repository";
import { Restaurant as RestaurantData } from "../../../src/domain/entities/restaurant";
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
  addParams: Record<string, RestaurantData> = {};
  updateParams: {
    restaurantId?: string,
    restaurant?: Omit<RestaurantData, '_id'>,
  } = {};
  removeParams: {
    restaurantId?: string,
  } = {};

  async findAllRestaurants(): Promise<RestaurantData[]> {
    return [MockData.mockRestaurant()];
  }

  async findRestaurantById(restaurantId: string): Promise<RestaurantData | null> {
    this.findRestaurantByIdParams = {restaurantId};
    return MockData.mockRestaurant();
  }

  async findRestaurantByAdminId(adminId: string): Promise<RestaurantData | null> {
    this.findRestaurantByAdminIdParams = { adminId };
    return MockData.mockRestaurant();
  }

  async findRestaurantByZipCode(zipCode: string): Promise<RestaurantData | null> {
    this.findRestaurantByZipCodeParams = { zipCode };
    return MockData.mockRestaurant();
  }

  async add(restaurant: RestaurantData): Promise<void> {
    this.addParams = { restaurant };
  }

  async update(restaurantId: string, restaurant: Omit<RestaurantData, '_id'>): Promise<void> {
    this.updateParams = {
      restaurantId,
      restaurant
    };
  }

  async remove(restaurantId: string): Promise<void> {
    this.removeParams = {restaurantId};
  }

}