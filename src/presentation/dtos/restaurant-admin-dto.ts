import { BaseUserDTO } from "./base-user-dto";

export interface  RestaurantAdminDTO extends BaseUserDTO{
  role: "platformAdmin";
  restaurantId: string;
}