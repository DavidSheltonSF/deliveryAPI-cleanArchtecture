import { ObjectId } from 'mongodb';
import { AddressRepository } from '../../application/ports/AddressRepository';
import { WithId } from '../../utils/types/WithId';
import { AddressProps } from '../../domain/entities/props/AddressProps';
import { AddressZipCode } from '../../domain/value-objects';

const mockAddressData: WithId<AddressProps>[] = [
  {
    id: new ObjectId().toString(),
    userId: new ObjectId().toString(),
    street: 'Rua Teste',
    city: 'São Paulo',
    state: 'São Paulo',
    zipCode: AddressZipCode.createFromPersistence('21145587'),
  },
];

export function mockAddressRepository(): AddressRepository {
  const addressRepository: AddressRepository = {
    findById: jest.fn(async (id: string) => mockAddressData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAddressData[0]),
    create: jest.fn(async (addres: AddressProps) => mockAddressData[0]),
    update: jest.fn(
      async (id: string, address: AddressProps) => mockAddressData[0]
    ),
    delete: jest.fn(async (id: string) => mockAddressData[0]),
  };

  return addressRepository;
}
