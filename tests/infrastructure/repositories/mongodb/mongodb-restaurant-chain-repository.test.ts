import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbRestaurantChainRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-restaurant-chain-repository';
import { generateHexId } from '../../../../src/shared/generateHexId';
import { MongodbMapper } from '../../../../src/infrastructure/repositories/mongodb/helpers/MongodbMapper';

config();

const repository = new MongodbRestaurantChainRepository();

const adminId0 = generateHexId();
const adminId1 = generateHexId();

const RestaurantChains = [
  {
    id: generateHexId(),
    name: 'Pizzaria do Ivan',
    cnpj: '12345678901234',
    iconUrl: 'fadsfsf1s1f65afd',
    adminId: adminId0,
  },
  {
    id: generateHexId(),
    name: 'RestaurantChaine do Yakumoto',
    cnpj: '12345678901235',
    iconUrl: 'fadsfsf1s1f6599d',
    adminId: adminId1,
  },
];

describe('Testing MongodbRestaurantChainRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI) {
      await mongoHelper.connect(MONGO_URI);
    } else {
      console.log('NO URI');
    }
  }, 60000);

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.clearCollection('restaurantChain');
  });

  test('Should add a new RestaurantChain in the database', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChains to database
    await repository.add(RestaurantChains[0]);

    const foundRestaurantChain = await RestaurantChainCollection.findOne({
      adminId: RestaurantChains[0].adminId,
    });

    expect(foundRestaurantChain?.name).toBe(RestaurantChains[0].name);
    expect(foundRestaurantChain?.cnpj).toBe(RestaurantChains[0].cnpj);
    expect(foundRestaurantChain?.iconUrl).toBe(RestaurantChains[0]?.iconUrl);
    expect(foundRestaurantChain?.adminId).toBe(RestaurantChains[0].adminId);
  });

  test('Should return all RestaurantChains in the database', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChains to database
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[0])
    );
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[1])
    );

    const allRestaurantChains = await repository.findAllRestaurantChains();

    expect(allRestaurantChains[0].adminId).toEqual(RestaurantChains[0].adminId);
    expect(allRestaurantChains[1].adminId).toEqual(RestaurantChains[1].adminId);
  });

  test('Should find a RestaurantChain by id', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChain to database
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[0])
    );

    const foundRestaurantChain = await repository.findRestaurantChainById(
      RestaurantChains[0].id.toString()
    );

    expect(foundRestaurantChain?.name).toBe(RestaurantChains[0].name);
    expect(foundRestaurantChain?.cnpj).toBe(RestaurantChains[0].cnpj);
    expect(foundRestaurantChain?.iconUrl).toBe(RestaurantChains[0].iconUrl);
    expect(foundRestaurantChain?.adminId).toBe(RestaurantChains[0].adminId);
  });

  test('Should find a RestaurantChain by adminId', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChain to database
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[0])
    );

    const foundRestaurantChain = await repository.findRestaurantChainByAdminId(
      RestaurantChains[0].adminId
    );

    expect(foundRestaurantChain?.name).toBe(RestaurantChains[0].name);
    expect(foundRestaurantChain?.cnpj).toBe(RestaurantChains[0].cnpj);
    expect(foundRestaurantChain?.iconUrl).toBe(RestaurantChains[0].iconUrl);
    expect(foundRestaurantChain?.adminId).toBe(RestaurantChains[0].adminId);
  });

  test('Should update RestaurantChain by id', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChain to database
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[0])
    );

    const updatedAdminId = generateHexId();
    const updatedRestaurantChain = {
      name: 'Pizzaria do Ivan-updated',
      cnpj: '12345678901234-updated',
      iconUrl: 'fadsfsf1s1f65afd-updated',
      adminId: updatedAdminId,
    };

    await repository.update(
      RestaurantChains[0].id.toString(),
      updatedRestaurantChain
    );

    const foundRestaurantChain = await repository.findRestaurantChainById(
      RestaurantChains[0].id.toString()
    );

    expect(foundRestaurantChain?.name).toBe(updatedRestaurantChain.name);
    expect(foundRestaurantChain?.cnpj).toBe(updatedRestaurantChain.cnpj);
    expect(foundRestaurantChain?.iconUrl).toBe(updatedRestaurantChain.iconUrl);
    expect(foundRestaurantChain?.adminId).toBe(updatedRestaurantChain.adminId);
  });

  test('Should remove RestaurantChain by id', async () => {
    const RestaurantChainCollection =
      mongoHelper.getCollection('restaurantChain');

    // Adding new RestaurantChain to database
    await RestaurantChainCollection.insertOne(
      MongodbMapper.toMongodbDocument(RestaurantChains[0])
    );

    await repository.remove(RestaurantChains[0].id.toString());

    const foundRestaurantChain = await repository.findRestaurantChainById(
      RestaurantChains[0].id.toString()
    );

    expect(foundRestaurantChain).toBeFalsy();
  });
});
