import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbDishRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-dish-repository";
import { generateHexId } from "../../../../src/shared/generateHexId";
import { DishMapper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mappers/dish-mapper";

config();

const repository = new MongodbDishRepository();

const restaurantId0 = generateHexId();
const restaurantId1 = generateHexId();

const dishes = [
  {
    _id: generateHexId(),
    name: 'pizza quatro queijos',
    description: 'pizza com 4 queijos',
    price: 30,
    restaurantId: restaurantId0,
    imageUrl: 'fadsfsf1s1f6afdfd',
  },
  {
    _id: generateHexId(),
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

    // Adding new dishes to database
    await repository.add(dishes[0]);

    const foundDish = await DishCollection
      .findOne({restaurantId: dishes[0].restaurantId});
    
    expect(foundDish?.name)
      .toBe(dishes[0].name);
    expect(foundDish?.description)
      .toBe(dishes[0].description);
    expect(foundDish?.price)
      .toBe(dishes[0].price);
    expect(foundDish?.restaurantId)
      .toBe(dishes[0].restaurantId);
    expect(foundDish?.imageUrl)
    .toBe(dishes[0].imageUrl);
  });

  test('Should return all dishes in the database', async () => {

    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new dishes to database
    await DishCollection.insertOne(DishMapper.toDishDocument(dishes[0]));
    await DishCollection.insertOne(DishMapper.toDishDocument(dishes[1]));


    const alldishes = await repository.findAllDishs();
    
    expect(alldishes[0].restaurantId).toEqual(dishes[0].restaurantId);
    expect(alldishes[1].restaurantId).toEqual(dishes[1].restaurantId);
  });

  test('Should find a Dish by id', async () => {

    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new Dish to database
    await DishCollection.insertOne(DishMapper.toDishDocument(dishes[0]));

    const foundDish = await repository.findDishById(dishes[0]._id);

    expect(foundDish?.name)
      .toBe(dishes[0].name);
    expect(foundDish?.description)
      .toBe(dishes[0].description);
    expect(foundDish?.price)
      .toBe(dishes[0].price);
    expect(foundDish?.restaurantId)
      .toBe(dishes[0].restaurantId);
    expect(foundDish?.imageUrl)
      .toBe(dishes[0].imageUrl);
  });

  test('Should update Dish by id', async () => {
    
    const DishCollection = mongoHelper.getCollection('dish');

    // Adding new Dish to database
    await DishCollection.insertOne(DishMapper.toDishDocument(dishes[0]));

    const updatedRestaurantId = generateHexId();
    const updatedDish = {
      name: 'pizza quatro queijos-updated',
      description: 'pizza com 4 queijos-updated',
      price: 999,
      restaurantId: updatedRestaurantId,
      imageUrl: 'fadsfsf1s1f6afdfd-updated',
    }

    await repository.update(dishes[0]._id, updatedDish);

    const foundDish = await repository.findDishById(dishes[0]._id);

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
    await DishCollection.insertOne(DishMapper.toDishDocument(dishes[0]));

    await repository.remove(dishes[0]._id);

    const foundDish = await repository.findDishById(dishes[0]._id);

    expect(foundDish)
      .toBeFalsy();
  });
  
})