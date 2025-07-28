import { ObjectId } from 'mongodb';
import { IdService } from '../../domain/contracts/IdService';

export class MongodbIdAdapter implements IdService {
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
