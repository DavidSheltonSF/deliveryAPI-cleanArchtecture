import { BaseUserDTO } from "./base-user-dto";

export interface  AdminUserDTO extends BaseUserDTO{
  role: "admin" | "restaurant_admin";
}