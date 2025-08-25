import { HashService } from '../../domain/contracts/HashService';
import { TokenService } from '../../domain/contracts/TokenService';

export const makeMockTokenService = (): TokenService => ({
  sign: jest.fn((payload: Record<string, any>) => JSON.stringify(payload)),
  verify: jest.fn((token: string) => {
    return JSON.parse(token);
  }),
});
