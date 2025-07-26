import { ObjectId } from 'mongodb';
import { IdGenerator } from '../../domain/contracts/IdGenerator';

export class MongoIdGenerator implements IdGenerator {
  generate(): string {
    return new ObjectId().toString();
  }

  validate(id: string): boolean {
    try {
      new ObjectId(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
