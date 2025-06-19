import { BaseUserDTO } from "./base-user-dto";

export interface  PlatformAdminDTO extends BaseUserDTO{
  role: "platformAdmin";
}