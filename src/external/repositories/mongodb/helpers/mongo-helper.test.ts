import { mongoHelper } from "./mongo-helper";
import { config } from "dotenv";

config();

describe('Testing mongoHelper', () => {
  afterAll(async () => {
    await mongoHelper.clearCollection('userstesting')
    await mongoHelper.disconnect();
  });
  test('Should add a new document into a collection', async () => {
    console.log(process.env.MONGO_URI);
    await mongoHelper.connect(process.env.MONGO_URI);

    const user = {name: 'Daniela'};
    const collection = mongoHelper.getCollection('userstesting');
    await collection.insertOne(user);
    const result = await collection.findOne(user);

    expect(user.name).toBe(result.name)
  });
})