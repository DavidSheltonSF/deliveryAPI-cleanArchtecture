import { ObjectId } from 'mongodb';
import { IdService } from '../../domain/contracts/IdService';

export class MongodbIdAdapter implements IdService {
  generate(): ObjectId {
    return new ObjectId();
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
