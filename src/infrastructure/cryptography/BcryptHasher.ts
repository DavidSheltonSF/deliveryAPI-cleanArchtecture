import bcrypt from 'bcryptjs';
import { Hasher } from '../../domain/contracts/Hasher';
import { Comparer } from '../../domain/contracts/Comparer';

export class BcryptHasher implements Hasher, Comparer {
  constructor(private readonly salt: number = 12) {}

  async hash(raw: string): Promise<string> {
    return bcrypt.hash(raw, this.salt);
  }

  async compare(raw: string, hash: string): Promise<boolean>{
    return bcrypt.compare(raw, hash);
  }
}
