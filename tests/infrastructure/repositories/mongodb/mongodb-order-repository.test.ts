import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbOrderRepository } from '../../../../src/infrastructure/repositories/mongodb/mongodb-order-repository';
import { generateHexId } from '../../../../src/shared/generateHexId';
import { MongodbMapper } from '../../../../src/infrastructure/repositories/mongodb/helpers/MongodbMapper';

config();

const repository = new MongodbOrderRepository();

const customerId0 = generateHexId();
const restaurantId0 = generateHexId();
const customerId1 = generateHexId();
const restaurantId1 = generateHexId();

const orders = [
  {
    id: generateHexId(),
    customerId: customerId0,
    restaurantId: restaurantId0,
    dishes: [
      {
        name: 'pizza quatro queijos',
        description: 'pizza com 4 queijos',
        price: 30,
        imageUrl: 'fadsfsf1s1f6afdfd',
      },
      {
        name: 'pizza de chocolate',
        description: 'pizza com chocolate',
        price: 40,
        imageUrl: 'fadsfsf1s1f6afafdfas',
      },
    ],
    totalPrice: 200,
    status: 'preparing',
    address: {
      street: 'Rua 1',
      city: 'Cidade 1',
      state: 'Estado 1',
      zipCode: '00000-000',
    },
  },
  {
    id: generateHexId(),
    customerId: customerId1,
    restaurantId: restaurantId1,
    dishes: [
      {
        name: 'Yaksoma de camarão',
        description: 'Yaksoma com camarão',
        price: 20,
        imageUrl: 'fadsfsf1s1f6afsdfasfdasf',
      },
      {
        name: 'Pastel de queijo',
        description: 'Pastel de queijo',
        price: 40,
        imageUrl: 'fadsfsf1sdafsf6afafdfas',
      },
    ],
    totalPrice: 60,
    status: 'preparing',
    address: {
      street: 'Rua 2',
      city: 'Cidade 1',
      state: 'Estado 3',
      zipCode: '00000-000',
    },
  },
];

describe('Testing MongodbOrderRepository', () => {
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
    await mongoHelper.clearCollection('order');
  });

  test('Should add a new Order in the database', async () => {
    const OrderCollection = mongoHelper.getCollection('order');

    // Adding new orders to database
    await repository.add(orders[0]);

    const foundOrder = await OrderCollection.findOne({
      _id: mongoHelper.toObjectId(orders[0].id),
    });

    expect(foundOrder?.customerId).toBe(orders[0].customerId);
    expect(foundOrder?.restaurantId).toBe(orders[0].restaurantId);
    expect(JSON.stringify(foundOrder?.dishes)).toBe(
      JSON.stringify(orders[0].dishes)
    );
    expect(foundOrder?.totalPrice).toBe(orders[0].totalPrice);
    expect(foundOrder?.status).toBe(orders[0].status);
    expect(JSON.stringify(foundOrder?.address)).toBe(
      JSON.stringify(orders[0].address)
    );
  });

  test('Should return all orders in the database', async () => {
    const OrderCollection = mongoHelper.getCollection('order');

    // Adding new orders to database
    await OrderCollection.insertOne(MongodbMapper.toMongodbDocument(orders[0]));
    await OrderCollection.insertOne(MongodbMapper.toMongodbDocument(orders[1]));

    const allorders = await repository.findAllOrders();

    expect(allorders[0].id).toEqual(orders[0].id);
    expect(allorders[1].id).toEqual(orders[1].id);
  });

  test('Should find a Order by id', async () => {
    const OrderCollection = mongoHelper.getCollection('order');

    // Adding new Order to database
    await OrderCollection.insertOne(MongodbMapper.toMongodbDocument(orders[0]));

    const foundOrder = await repository.findOrderById(orders[0].id.toString());

    expect(foundOrder?.customerId).toBe(orders[0].customerId);
    expect(foundOrder?.restaurantId).toBe(orders[0].restaurantId);
    expect(JSON.stringify(foundOrder?.dishes)).toBe(
      JSON.stringify(orders[0].dishes)
    );
    expect(foundOrder?.totalPrice).toBe(orders[0].totalPrice);
    expect(foundOrder?.status).toBe(orders[0].status);
    expect(JSON.stringify(foundOrder?.address)).toBe(
      JSON.stringify(orders[0].address)
    );
  });

  test('Should update Order by id', async () => {
    const OrderCollection = mongoHelper.getCollection('order');

    // Adding new Order to database
    await OrderCollection.insertOne(MongodbMapper.toMongodbDocument(orders[0]));

    const updatedCustomerId = generateHexId();
    const updatedRestaurantId = generateHexId();

    const updatedOrder = {
      customerId: updatedCustomerId,
      restaurantId: updatedRestaurantId,
      dishes: [
        {
          name: 'pizza quatro queijos-updated',
          description: 'pizza com 4 queijos-updated',
          price: 999,
          imageUrl: 'fadsfsf1s1f6afdfd-updated',
        },
        {
          name: 'pizza de chocolate-updated',
          description: 'pizza com chocolate-updated',
          price: 999,
          imageUrl: 'fadsfsf1s1f6afafdfas-updated',
        },
      ],
      totalPrice: 999,
      status: 'preparing-updated',
      address: {
        street: 'Rua 1-updated',
        city: 'Cidade 1-updated',
        state: 'Estado 1-updated',
        zipCode: '00000-000-updated',
      },
    };

    await repository.update(orders[0].id.toString(), updatedOrder);

    const foundOrder = await repository.findOrderById(orders[0].id.toString());

    expect(foundOrder?.customerId).toBe(updatedOrder.customerId);
    expect(foundOrder?.restaurantId).toBe(updatedOrder.restaurantId);
    expect(JSON.stringify(foundOrder?.dishes)).toBe(
      JSON.stringify(updatedOrder.dishes)
    );
    expect(foundOrder?.totalPrice).toBe(updatedOrder.totalPrice);
    expect(foundOrder?.status).toBe(updatedOrder.status);
    expect(JSON.stringify(foundOrder?.address)).toBe(
      JSON.stringify(updatedOrder.address)
    );
  });

  test('Should remove Order by id', async () => {
    const OrderCollection = mongoHelper.getCollection('order');

    // Adding new Order to database
    await OrderCollection.insertOne(MongodbMapper.toMongodbDocument(orders[0]));

    await repository.remove(orders[0].id.toString());

    const foundOrder = await repository.findOrderById(orders[0].id.toString());

    expect(foundOrder).toBeFalsy();
  });
});
