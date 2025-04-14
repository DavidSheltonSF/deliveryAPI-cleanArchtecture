import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbDishRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-dish-repository";
import { generateHexId } from "../../../../src/shared/generateHexId";

config();

const repository = new MongodbDishRepository();

const restaurantId0 = generateHexId();
const restaurantId1 = generateHexId();

const dishs = [
  {
    _id: mongoHelper.toObjectId('60f1b9b3b3b3b3b3b3b3b3b3'),
    name: 'pizza quatro queijos',
    description: 'pizza com 4 queijos',
    price: 30,
    restaurantId: restaurantId0,
    imageUrl: 'fadsfsf1s1f6afdfd',
  },
  {
    _id: mongoHelper.toObjectId('60f1b9b3b3b3b3b3b3b3b3c3'),
    name: 'pizza de chocolate',
    description: 'pizza com chocolate',
    price: 40,
    restaurantId: restaurantId1,
    imageUrl: 'fadsfsf1s1f6afafdfas',
  },
]

describe('Testing MongodbDishRepository', () => {
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
    await mongoHelper.clearCollection('dish');
  });

  test('Should add a new Dish in the database', async () => {

    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new dishs to database
    await repository.add(dishs[0]);

    const foundDish = await DishCollection
      .findOne({restaurantId: dishs[0].restaurantId});
    
    expect(foundDish?.name)
      .toBe(dishs[0].name);
    expect(foundDish?.description)
      .toBe(dishs[0].description);
    expect(foundDish?.price)
      .toBe(dishs[0].price);
    expect(foundDish?.restaurantId)
      .toBe(dishs[0].restaurantId);
    expect(foundDish?.imageUrl)
    .toBe(dishs[0].imageUrl);
  });

  test('Should return all dishs in the database', async () => {

    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new dishs to database
    await DishCollection.insertOne(dishs[0]);
    await DishCollection.insertOne(dishs[1]);

    const alldishs = await repository.findAllDishs();
    
    expect(alldishs[0].restaurantId).toEqual(dishs[0].restaurantId);
    expect(alldishs[1].restaurantId).toEqual(dishs[1].restaurantId);
  });

  test('Should find a Dish by id', async () => {

    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new Dish to database
    await DishCollection.insertOne(dishs[0]);

    const foundDish = await repository.findDishById(dishs[0]._id.toString());

    expect(foundDish?.name)
      .toBe(dishs[0].name);
    expect(foundDish?.description)
      .toBe(dishs[0].description);
    expect(foundDish?.price)
      .toBe(dishs[0].price);
    expect(foundDish?.restaurantId)
      .toBe(dishs[0].restaurantId);
    expect(foundDish?.imageUrl)
      .toBe(dishs[0].imageUrl);
  });

  test('Should update Dish by id', async () => {
    
    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new Dish to database
    await DishCollection.insertOne(dishs[0]);

    const updatedRestaurantId = generateHexId();
    const updatedDish = {
      name: 'pizza quatro queijos-updated',
      description: 'pizza com 4 queijos-updated',
      price: 999,
      restaurantId: updatedRestaurantId,
      imageUrl: 'fadsfsf1s1f6afdfd-updated',
    }

    await repository.update(dishs[0]._id.toString(), updatedDish);

    const foundDish = await repository.findDishById(dishs[0]._id.toString());

    expect(foundDish?.name)
      .toBe(updatedDish.name);
    expect(foundDish?.description)
      .toBe(updatedDish.description);
    expect(foundDish?.price)
      .toBe(updatedDish.price);
    expect(foundDish?.restaurantId)
      .toBe(updatedDish.restaurantId);
    expect(foundDish?.imageUrl)
      .toBe(updatedDish.imageUrl);
  });

  test('Should remove Dish by id', async () => {
    
    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new Dish to database
    await DishCollection.insertOne(dishs[0]);

    await repository.remove(dishs[0]._id.toString());

    const foundDish = await repository.findDishById(dishs[0]._id.toString());

    expect(foundDish)
      .toBeFalsy();
  });
  
})