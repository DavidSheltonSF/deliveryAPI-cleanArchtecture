import { HashService } from '../../domain/contracts/HashService';
import { TokenService } from '../../domain/contracts/TokenService';

export const makeMockTokenService = (): TokenService => ({
  sign: jest.fn((payload: Record<string, any>) => `mock-token_(${payload})`),
  verify: jest.fn((token: string) => {
    const prefix = token.split('_')[0];
    if (prefix !== 'mock-token') {
      return null;
    }

    return { token };
  }),
});
