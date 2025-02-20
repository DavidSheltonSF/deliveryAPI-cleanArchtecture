import { UserRole } from "./validators/role/role";
import { UserAddress } from "./validators/address/address";

interface Authentication {
  password: string,
  salt: { type: String, select: false },
  sesstionToken: { type: String, select: false }
}

export interface User {
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: UserRole,
  address: UserAddress,
  authentication: Authentication
}