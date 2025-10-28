import { AdminPermission } from "../../_enums";

export interface AdminProps {
  userId?: string;
  permissions: AdminPermission[]
}
