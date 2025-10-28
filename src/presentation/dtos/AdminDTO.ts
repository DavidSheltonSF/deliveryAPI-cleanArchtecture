import { AdminPermissionDTO } from "./AdminPermissionDTO";

export interface AdminDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: AdminPermissionDTO[]
  password: string;
}
