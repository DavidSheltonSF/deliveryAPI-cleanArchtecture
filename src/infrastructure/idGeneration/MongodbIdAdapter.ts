ObjectId
import { ObjectId } from "mongodb";
import { IdGenerator } from "../../domain/contracts/IdGenerator";

export class MongodbIdAdapter implements IdGenerator {
  generate(): string {
    return new ObjectId().toString();
  }
}