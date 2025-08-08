import { Address } from '../../domain/entities/Address';

export interface AddressRepository {
  findById: (id: string) => Promise<Address | null>;
  findByUserId: (userId: string) => Promise<Address | null>;
  create: (address: Address) => Promise<Address>;
  update: (address: Address) => Promise<Address>;
  delete: (id: string) => Promise<Address | null>;
}
