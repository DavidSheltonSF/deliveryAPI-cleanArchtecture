import { AddressProps } from "../../domain/entities/props/AddressProps";
import { WithId } from "../../utils/types/WithId";

export interface AddressRepository {
  findById: (id: string) => Promise<WithId<AddressProps> | null>;
  findByUserId: (userId: string) => Promise<WithId<AddressProps> | null>;
  create: (address: AddressProps) => Promise<WithId<AddressProps>>;
  update: (address: WithId<AddressProps>) => Promise<WithId<AddressProps>>;
  delete: (id: string) => Promise<WithId<AddressProps> | null>;
}
