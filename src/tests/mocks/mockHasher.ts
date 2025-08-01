import { HashService } from "../../domain/contracts/HashService"

export const makeMockHasher = (): HashService => ({
  hash: jest.fn(async (raw) => `mock-hash(${raw})`),
  compare: jest.fn(async (raw, hash) => hash === `mock-hash(${raw})`),
});