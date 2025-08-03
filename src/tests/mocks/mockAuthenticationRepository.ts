import { ObjectId } from 'mongodb';
import { AuthenticationModel } from '../../infrastructure/models/mongodb/AuthenticationModel';
import { AuthenticationRepository } from '../../application/ports/AuthenticationRepository';
import { Authentication } from '../../domain/entities/Authentication';

const mockAuthData: AuthenticationModel[] = [
  {
    _id: new ObjectId().toString(),
    userId: new ObjectId().toString(),
    passwordHash: 'fakeHashffsdaa',
    sessionToken: undefined,
    createdAt: new Date(),
  },
];

export function mockAuthRepository(): AuthenticationRepository {
  const authenticationRepository: AuthenticationRepository = {
    findAll: jest.fn(async () => mockAuthData),
    findById: jest.fn(async (id: string) => mockAuthData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAuthData[0]),
    create: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    update: jest.fn(async (auth: Authentication) => mockAuthData[0]),
    delete: jest.fn(async (id: string) => mockAuthData[0]),
  };

  return authenticationRepository;
}
