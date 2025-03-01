import { MongoClient, Collection, ObjectId } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient, 

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect (): Promise<void> {
    this.client.close();
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name);
  },

  toObjectId (id: string): ObjectId {
    return new ObjectId(id);
  },

  clearCollection (name: string): void {
    this.client.db().collection(name).deleteMany({});
  }
}