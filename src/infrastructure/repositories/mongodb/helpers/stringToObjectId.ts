import { ObjectId } from 'mongodb';

export function stringToObjectId(id: string) {
  return new ObjectId(id);
}
