import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbRestaurantRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-restaurant-repository";
import { generateHexId } from "../../../../src/shared/generateHexId";
import { RestaurantMapper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mappers/restaurant-mapper";

config();

const repository = new MongodbRestaurantRepository();

const restaurantChainId0 = generateHexId();
const restaurantChainId1 = generateHexId();
const adminId0 = generateHexId();
const adminId1 = generateHexId();

const restaurants = [
  {
    id: generateHexId(),
    restaurantChainId: restaurantChainId0,
    adminId: adminId0,
    isOpen: false,
    phone: '21555777777',
    imageUrl: 'fadsfsf1s1f65afd',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22222220'
    },
  },
  {
    id: generateHexId(),
    restaurantChainId: restaurantChainId1,
    adminId: adminId1, 
    isOpen: true,
    phone: '21555777787',
    imageUrl: 'fadsfsf1skk65afd',
    address: {
      street: 'test streed',
      city: 'Belford Roxo',
      state: 'Rio de Janeiro',
      zipCode: '22222288'
    },
  },
]

describe('Testing MongodbRestaurantRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI){
      await mongoHelper.connect(MONGO_URI);
      
    } else {
      console.log('NO URI');
    }
      
  }, 60000);
  
  afterAll(async () => {
    await mongoHelper.disconnect();

  });

  
  beforeEach(async () => {
    await mongoHelper.clearCollection('restaurants');
  });

  test('Should add a new restaurant in the database', async () => {

    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurants to database
    await repository.add(restaurants[0]);

    const foundRestaurant = await restaurantCollection
      .findOne({adminId: restaurants[0].adminId});
    
    expect(foundRestaurant?.restaurantChainId)
      .toBe(restaurants[0].restaurantChainId);
    expect(foundRestaurant?.adminId)
      .toBe(restaurants[0].adminId);
    expect(foundRestaurant?.isOpen)
      .toBe(restaurants[0].isOpen);
    expect(foundRestaurant?.phone)
      .toBe(restaurants[0].phone);
    expect(foundRestaurant?.imageUrl)
      .toBe(restaurants[0].imageUrl);
    expect(JSON.stringify(foundRestaurant?.address))
      .toBe(JSON.stringify(restaurants[0].address));
  });

  test('Should return all restaurants in the database', async () => {

    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurants to database
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[0]));
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[1]));


    const allRestaurants = await repository.findAllRestaurants();
    
    expect(allRestaurants[0].restaurantChainId).toEqual(restaurants[0].restaurantChainId);
    expect(allRestaurants[1].restaurantChainId).toEqual(restaurants[1].restaurantChainId);
  });

  test('Should find a restaurant by id', async () => {

    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurant to database
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[0]));

    const foundRestaurant = await repository.findRestaurantById(restaurants[0].id.toString());

    expect(foundRestaurant?.restaurantChainId)
      .toBe(restaurants[0].restaurantChainId);
    expect(foundRestaurant?.adminId)
      .toBe(restaurants[0].adminId);
    expect(foundRestaurant?.isOpen)
      .toBe(restaurants[0].isOpen);
    expect(foundRestaurant?.phone)
      .toBe(restaurants[0].phone);
    expect(foundRestaurant?.imageUrl)
      .toBe(restaurants[0].imageUrl);
    expect(JSON.stringify(foundRestaurant?.address))
      .toBe(JSON.stringify(restaurants[0].address));
  });

  test('Should find a restaurant by adminId', async () => {

    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurant to database
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[0]));


    const foundRestaurant = await repository.findRestaurantByAdminId(restaurants[0].adminId);

    expect(foundRestaurant?.restaurantChainId)
    .toBe(restaurants[0].restaurantChainId);
  expect(foundRestaurant?.adminId)
    .toBe(restaurants[0].adminId);
  expect(foundRestaurant?.isOpen)
    .toBe(restaurants[0].isOpen);
  expect(foundRestaurant?.phone)
    .toBe(restaurants[0].phone);
  expect(foundRestaurant?.imageUrl)
    .toBe(restaurants[0].imageUrl);
  expect(JSON.stringify(foundRestaurant?.address))
    .toBe(JSON.stringify(restaurants[0].address));
  
  });

  test('Should update restaurant by id', async () => {
    
    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurant to database
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[0]));


    const updatedAdminId = generateHexId();
    const updatedRestaurant = {
      restaurantChainId: restaurantChainId0,
      adminId: updatedAdminId,
      isOpen: true,
      phone: '21555777777-updated',
      imageUrl: 'fadsfsf1s1f65afd-updated',
      address: {
        street: 'test streed-updated',
        city: 'Belford Roxo-updated',
        state: 'Rio de Janeiro-updated',
        zipCode: '22222220-updated'
      },
    }

    await repository.update(restaurants[0].id.toString(), updatedRestaurant);

    const foundRestaurant = await repository.findRestaurantById(restaurants[0].id.toString());

    expect(foundRestaurant?.restaurantChainId)
    .toBe(updatedRestaurant.restaurantChainId);
  expect(foundRestaurant?.adminId)
    .toBe(updatedRestaurant.adminId);
  expect(foundRestaurant?.isOpen)
    .toBe(updatedRestaurant.isOpen);
  expect(foundRestaurant?.phone)
    .toBe(updatedRestaurant.phone);
  expect(foundRestaurant?.imageUrl)
    .toBe(updatedRestaurant.imageUrl);
  expect(JSON.stringify(foundRestaurant?.address))
    .toBe(JSON.stringify(updatedRestaurant.address));

  });

  test('Should remove restaurant by id', async () => {
    
    const restaurantCollection = mongoHelper.getCollection('restaurants');

    // Adding new restaurant to database
    await restaurantCollection.insertOne(RestaurantMapper.toRestaurantDocument(restaurants[0]));


    await repository.remove(restaurants[0].id.toString());

    const foundRestaurant = await repository.findRestaurantById(restaurants[0].id.toString());

    expect(foundRestaurant)
      .toBeFalsy();
  });
  
})