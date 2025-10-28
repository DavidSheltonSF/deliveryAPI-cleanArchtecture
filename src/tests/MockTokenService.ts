import { TokenService } from '../domain/contracts/TokenService';

export class MockTokenService implements TokenService {
  sign(payload: Record<string, any>): string {
    return JSON.stringify(payload);
  }

  verify(token: string): Record<string, any> | null {
    return JSON.parse(token);
  }
}
