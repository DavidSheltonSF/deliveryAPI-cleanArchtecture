import bcrypt from 'bcryptjs';
import { HashService } from '../../domain/contracts/HashService';

export class BcryptHasher implements HashService {
  constructor(private readonly salt: number = 12) {}

  async hash(raw: string): Promise<string> {
    return await bcrypt.hash(raw, this.salt);
  }

  async compare(raw: string, hash: string): Promise<boolean>{
    return await bcrypt.compare(raw, hash);
  }
}
