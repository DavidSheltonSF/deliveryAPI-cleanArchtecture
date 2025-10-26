import { AddressRepository } from '../application/ports/AddressRepository';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { WithId } from '../utils/types/WithId';
import { AddressMocker } from './mocks/AddressMocker';

interface MockRepoReturnConfig {
  findAll?: WithId<AddressProps>[];
  findById?: WithId<AddressProps> | null;
  findByUserId?: WithId<AddressProps> | null;
  create?: WithId<AddressProps> | null;
  update?: WithId<AddressProps> | null;
  delete?: WithId<AddressProps> | null;
}

export class MockAddressRepository implements AddressRepository {
  constructor(private readonly customReturn: MockRepoReturnConfig = {}) {}

  async findAll(): Promise<WithId<AddressProps>[]> {
    const promise: Promise<WithId<AddressProps>[]> = new Promise((resolve) => {
      if (!this.customReturn.findAll) {
        const address: WithId<AddressProps> =
          AddressMocker.mockAddressPropsWithId();
        resolve([address]);
      }

      resolve(this.customReturn.findAll);
    });

    return promise;
  }

  async findById(id: string): Promise<WithId<AddressProps>> {
    const promise: Promise<WithId<AddressProps>> = new Promise((resolve) => {
      if (!this.customReturn.findById) {
        const address = AddressMocker.mockAddressPropsWithId();
        resolve(address);
      }

      resolve(this.customReturn.findById);
    });

    return promise;
  }

  async findByUserId(userId: string): Promise<WithId<AddressProps>> {
    const promise: Promise<WithId<AddressProps>> = new Promise((resolve) => {
      if (!this.customReturn.findByUserId) {
        const address = AddressMocker.mockAddressPropsWithId();
        resolve(address);
      }

      resolve(this.customReturn.findByUserId);
    });

    return promise;
  }

  async create(address: AddressProps): Promise<WithId<AddressProps>> {
    const promise: Promise<WithId<AddressProps>> = new Promise((resolve) => {
      if (!this.customReturn.create) {
        const address = AddressMocker.mockAddressPropsWithId();
        resolve(address);
      }

      resolve(this.customReturn.create);
    });

    return promise;
  }

  async update(id: string): Promise<WithId<AddressProps>> {
    const promise: Promise<WithId<AddressProps>> = new Promise((resolve) => {
      if (!this.customReturn.update) {
        const address = AddressMocker.mockAddressPropsWithId();
        resolve(address);
      }

      resolve(this.customReturn.update);
    });

    return promise;
  }

  async delete(id: string): Promise<WithId<AddressProps>> {
    const promise: Promise<WithId<AddressProps>> = new Promise((resolve) => {
      if (!this.customReturn.delete) {
        const address = AddressMocker.mockAddressPropsWithId();
        resolve(address);
      }

      resolve(this.customReturn.delete);
    });

    return promise;
  }
}
