import { ObjectId } from 'mongodb';
import { AddressRepository } from '../../application/_ports/AddressRepository';
import { AddressModel } from '../../infrastructure/models/mongodb/AddressModel';
import { Address } from '../../domain/entities/Address';

const mockAddressData: AddressModel[] = [
  {
    _id: new ObjectId(),
    userId: new ObjectId(),
    street: 'Rua Teste',
    city: 'São Paulo',
    state: 'São Paulo',
    zipCode: '21145587',
    createdAt: new Date(),
  },
];

export function mockAddressRepository(): AddressRepository {
  const addressRepository: AddressRepository = {
    findAll: jest.fn(async () => mockAddressData),
    findById: jest.fn(async (id: string) => mockAddressData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAddressData[0]),
    create: jest.fn(async (addres: Address) => mockAddressData[0]),
    update: jest.fn(async (address: Address) => mockAddressData[0]),
    delete: jest.fn(async (id: string) => mockAddressData[0]),
  };

  return addressRepository;
}
