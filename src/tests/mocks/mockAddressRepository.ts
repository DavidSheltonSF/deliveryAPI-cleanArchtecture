import { AddressRepository } from '../../application/ports/AddressRepository';
import { WithId } from '../../utils/types/WithId';
import { AddressProps } from '../../domain/entities/props/AddressProps';

export function mockAddressRepository(fakeDataBase: WithId<AddressProps>[]): AddressRepository {
  const addressRepository: AddressRepository = {
    findById: jest.fn(async (id: string) => fakeDataBase[0]),
    findByUserId: jest.fn(async (userId: string) => fakeDataBase[0]),
    create: jest.fn(async (addres: AddressProps) => fakeDataBase[0]),
    update: jest.fn(
      async (id: string, address: AddressProps) => fakeDataBase[0]
    ),
    delete: jest.fn(async (id: string) => fakeDataBase[0]),
  };

  return addressRepository;
}
