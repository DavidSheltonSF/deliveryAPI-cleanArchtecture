import { mongoHelper } from "./helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbProductRepository } from "./mongodb-product-repository";
import { generateHexId } from "../../../shared/generateHexId";

config();

const repository = new MongodbProductRepository();

const restaurantId0 = generateHexId();
const restaurantId1 = generateHexId();

const products = [
  {
    name: 'pizza quatro queijos',
    description: 'pizza com 4 queijos',
    price: 30,
    restaurantId: restaurantId0,
    imageUrl: 'fadsfsf1s1f6afdfd',
  },
  {
    name: 'pizza de chocolate',
    description: 'pizza com chocolate',
    price: 40,
    restaurantId: restaurantId1,
    imageUrl: 'fadsfsf1s1f6afafdfas',
  },
]

describe('Testing MongodbProductRepository', () => {
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
    await mongoHelper.clearCollection('product');
  });

  test('Should add a new Product in the database', async () => {

    const ProductCollection = mongoHelper.getCollection('product');

    // Adding new products to database
    await repository.add(products[0]);

    const foundProduct = await ProductCollection
      .findOne({restaurantId: products[0].restaurantId});
    
    expect(foundProduct.name)
      .toBe(products[0].name);
    expect(foundProduct.description)
      .toBe(products[0].description);
    expect(foundProduct.price)
      .toBe(products[0].price);
    expect(foundProduct.restaurantId)
      .toBe(products[0].restaurantId);
    expect(foundProduct.imageUrl)
    .toBe(products[0].imageUrl);
  });

  test('Should return all products in the database', async () => {

    const ProductCollection = mongoHelper.getCollection('product');

    // Adding new products to database
    await ProductCollection.insertOne(products[0]);
    await ProductCollection.insertOne(products[1]);

    const allproducts = await repository.findAllProducts();
    
    expect(allproducts[0].restaurantId).toEqual(products[0].restaurantId);
    expect(allproducts[1].restaurantId).toEqual(products[1].restaurantId);
  });

  test('Should find a Product by id', async () => {

    const ProductCollection = mongoHelper.getCollection('product');

    // Adding new Product to database
    await ProductCollection.insertOne(products[0]);

    const Product = await ProductCollection.findOne({restaurantId: products[0].restaurantId});

    const foundProduct = await repository.findProductById(Product._id.toString());

    expect(foundProduct.name)
      .toBe(products[0].name);
    expect(foundProduct.description)
      .toBe(products[0].description);
    expect(foundProduct.price)
      .toBe(products[0].price);
    expect(foundProduct.restaurantId)
      .toBe(products[0].restaurantId);
    expect(foundProduct.imageUrl)
    .toBe(products[0].imageUrl);
  });

  test('Should update Product by id', async () => {
    
    const ProductCollection = mongoHelper.getCollection('product');

    // Adding new Product to database
    await ProductCollection.insertOne(products[0]);

    const updatedRestaurantId = generateHexId();
    const updatedProduct = {
      name: 'pizza quatro queijos-updated',
      description: 'pizza com 4 queijos-updated',
      price: 999,
      restaurantId: updatedRestaurantId,
      imageUrl: 'fadsfsf1s1f6afdfd-updated',
    }

    const Product = await ProductCollection.findOne({restaurantId: products[0].restaurantId});

    await repository.update(Product._id.toString(), updatedProduct);

    const foundProduct = await repository.findProductById(Product._id.toString());

    expect(foundProduct.name)
      .toBe(updatedProduct.name);
    expect(foundProduct.description)
      .toBe(updatedProduct.description);
    expect(foundProduct.price)
      .toBe(updatedProduct.price);
    expect(foundProduct.restaurantId)
      .toBe(updatedProduct.restaurantId);
    expect(foundProduct.imageUrl)
    .toBe(updatedProduct.imageUrl);
  });

  test('Should remove Product by id', async () => {
    
    const ProductCollection = mongoHelper.getCollection('product');

    // Adding new Product to database
    await ProductCollection.insertOne(products[0]);

    const Product = await ProductCollection.findOne({restaurantId: products[0].restaurantId});

    await repository.remove(Product._id.toString());

    const foundProduct = await repository.findProductById(Product._id.toString());

    expect(foundProduct)
      .toBeFalsy();
  });
  
})