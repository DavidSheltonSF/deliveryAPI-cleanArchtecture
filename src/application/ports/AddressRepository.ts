import { AddressProps } from "../../domain/entities/props/AddressProps";

export interface AddressRepository {
  findById: (id: string) => Promise<null>;
  findByUserId: (userId: string) => Promise<AddressProps | null>;
  create: (address: AddressProps) => Promise<AddressProps>;
  update: (address: AddressProps) => Promise<AddressProps>;
  delete: (id: string) => Promise<AddressProps | null>;
}
