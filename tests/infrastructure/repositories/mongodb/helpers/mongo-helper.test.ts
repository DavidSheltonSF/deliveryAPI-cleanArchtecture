import { mongoHelper } from "../../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";

config();

describe('Testing mongoHelper', () => {
  afterAll(async () => {
    await mongoHelper.clearCollection('userstesting')
    await mongoHelper.disconnect();
  });
  test('Should add a new document into a collection', async () => {
    //console.log(process.env.MONGO_URI);
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI){
      throw Error('MONGO_URI is empty');
    }
    await mongoHelper.connect(MONGO_URI);

    const user = {name: 'Daniela'};
    const collection = mongoHelper.getCollection('userstesting');
    await collection.insertOne(user);
    const result = await collection.findOne(user);

    expect(user.name).toBe(result?.name)
  });
})