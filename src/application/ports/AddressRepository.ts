import { Address } from '../../domain/entities/Address';
import { AddressModel } from '../../infrastructure/models/mongodb/AddressModel';

export interface AddressRepository {
  findById: (id: string) => Promise<AddressModel | null>;
  findByUserId: (userId: string) => Promise<AddressModel | null>;
  create: (address: Address) => Promise<AddressModel>;
  update: (address: Address) => Promise<AddressModel>;
  delete: (id: string) => Promise<AddressModel | null>;
}
