import { WithId } from '../../utils/types/WithId';
import { AuthenticationRepository } from '../../application/ports/AuthenticationRepository';
import { AuthenticationProps } from '../../domain/entities/props/AuthenticationProps';
import { Password } from '../../domain/value-objects';
import { ObjectId } from 'mongodb';
import { makeMockHasher } from './mockHasher';

async function makePasswordHash() {
  const hasher = makeMockHasher();
  const passwordHash = await hasher.hash('fakeHashffsdaa');

  return passwordHash;
}

async function makeAuthDatabase() {
  const passwordHash = await makePasswordHash();
  const mockAuthData: WithId<AuthenticationProps>[] = [
    {
      id: new ObjectId().toString(),
      userId: new ObjectId().toString(),
      passwordHash: Password.createFromPersistence(passwordHash),
      sessionToken: undefined,
    },
  ];
}

export async function mockAuthRepository(): Promise<AuthenticationRepository> {
  const mockAuthData = makeAuthDatabase;
  const authenticationRepository: AuthenticationRepository = {
    findBySessionToken: jest.fn(async (token: string) => mockAuthData[0]),
    findById: jest.fn(async (id: string) => mockAuthData[0]),
    findByUserId: jest.fn(async (userId: string) => mockAuthData[0]),
    create: jest.fn(async (auth: AuthenticationProps) => mockAuthData[0]),
    update: jest.fn(
      async (id: string, auth: AuthenticationProps) => mockAuthData[0]
    ),
    delete: jest.fn(async (id: string) => true),
  };

  return authenticationRepository;
}
