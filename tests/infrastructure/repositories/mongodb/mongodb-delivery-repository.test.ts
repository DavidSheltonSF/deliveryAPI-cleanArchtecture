import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbDeliveryRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-delivery-repository";
import { generateHexId } from "../../../../src/shared/generateHexId";

config();

const repository = new MongodbDeliveryRepository();

const orderId0 = generateHexId();
const driverId0 = generateHexId();
const orderId1 = generateHexId();
const driverId1 = generateHexId();


const deliverys = [
  { 
    _id: mongoHelper.toObjectId(generateHexId()),
    orderId: orderId0,
    driverId: driverId0,
    status: 'delivered',
    timeEstimate: 0
  },
  { 
    _id: mongoHelper.toObjectId(generateHexId()),
    orderId: orderId1,
    driverId: driverId1,
    status: 'on_the_way',
    timeEstimate: 20
  },
]

describe('Testing MongodbDeliveryRepository', () => {
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
    await mongoHelper.clearCollection('delivery');
  });

  test('Should add a new Delivery in the database', async () => {

    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new deliverys to database
    await repository.add(deliverys[0]);

    const foundDelivery = await DeliveryCollection
      .findOne({_id: deliverys[0]._id});
    
    expect(foundDelivery?.orderId)
      .toBe(deliverys[0].orderId);
    expect(foundDelivery?.driverId)
      .toBe(deliverys[0].driverId);
    expect(foundDelivery?.status)
      .toBe(deliverys[0].status);
    expect(foundDelivery?.timeEstimate)
      .toBe(deliverys[0].timeEstimate);
  });

  test('Should return all deliverys in the database', async () => {

    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new deliverys to database
    await DeliveryCollection.insertOne(deliverys[0]);
    await DeliveryCollection.insertOne(deliverys[1]);

    const alldeliverys = await repository.findAllDeliverys();
    
    expect(alldeliverys[0]._id).toEqual(deliverys[0]._id);
    expect(alldeliverys[1]._id).toEqual(deliverys[1]._id);
  });

  test('Should find a Delivery by id', async () => {

    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(deliverys[0]);

    const foundDelivery = await repository.findDeliveryById(deliverys[0]._id.toString());

    expect(foundDelivery?.orderId)
      .toBe(deliverys[0].orderId);
    expect(foundDelivery?.driverId)
      .toBe(deliverys[0].driverId);
    expect(foundDelivery?.status)
      .toBe(deliverys[0].status);
    expect(foundDelivery?.timeEstimate)
      .toBe(deliverys[0].timeEstimate);
  });

  test('Should update Delivery by id', async () => {
    
    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(deliverys[0]);

    const updatedorderI= generateHexId();
    const updatedDriverId = generateHexId();

    const updatedDelivery = { 
      orderId: updatedorderI,
      driverId: updatedDriverId,
      status: 'delivered-updated',
      timeEstimate: 999
    }

    await repository.update(deliverys[0]._id.toString(), updatedDelivery);

    const foundDelivery = await repository.findDeliveryById(deliverys[0]._id.toString());

    expect(foundDelivery?.orderId)
      .toBe(updatedDelivery.orderId);
    expect(foundDelivery?.driverId)
      .toBe(updatedDelivery.driverId);
    expect(foundDelivery?.status)
      .toBe(updatedDelivery.status);
    expect(foundDelivery?.timeEstimate)
      .toBe(updatedDelivery.timeEstimate);
  });

  test('Should remove Delivery by id', async () => {
    
    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(deliverys[0]);

    await repository.remove(deliverys[0]._id.toString());

    const foundDelivery = await repository.findDeliveryById(deliverys[0]._id.toString());

    expect(foundDelivery)
      .toBeFalsy();
  });
  
})