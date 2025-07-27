import { Address } from '../../domain/entities/Address';
import { AddressModel } from '../../infrastructure/models/mongodb/AddressModel';

export interface AddressRepository {
  findAll: () => Promise<AddressModel[]>;
  findById: (id: string) => Promise<AddressModel | null>;
  findByEmail: (email: string) => Promise<AddressModel | null>;
  add: (customer: Address) => Promise<AddressModel>;
  update: (id: string, customer: Address) => Promise<AddressModel>;
  delete: (id: string) => Promise<AddressModel | null>;
}
