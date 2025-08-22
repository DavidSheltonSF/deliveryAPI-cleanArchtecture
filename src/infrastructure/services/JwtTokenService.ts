import { TokenService } from '../../domain/contracts/TokenService';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export class JwtTokenService implements TokenService {
  sign(payload: Record<string, any>): string {
    return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '1h' });
  }

  verify(token: string): Record<string, any> | null {
    try {
      const result = jwt.verify(token, process.env.APP_SECRET);
      return new Object(result);
    } catch (error) {
      return null;
    }
  }
}
