import { mongoHelper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper";
import { config } from "dotenv";
import { MongodbDeliveryRepository } from "../../../../src/infrastructure/repositories/mongodb/mongodb-delivery-repository";
import { generateHexId } from "../../../../src/shared/generateHexId";
import { DeliveryMapper } from "../../../../src/infrastructure/repositories/mongodb/helpers/mappers/delivery-mapper";

config();

const repository = new MongodbDeliveryRepository();

const orderId0 = generateHexId();
const driverId0 = generateHexId();
const orderId1 = generateHexId();
const driverId1 = generateHexId();


const deliverys = [
  { 
    id: generateHexId(),
    orderId: orderId0,
    driverId: driverId0,
    status: 'delivered',
    timeEstimateInMinutes: 0
  },
  { 
    id: generateHexId(),
    orderId: orderId1,
    driverId: driverId1,
    status: 'on_the_way',
    timeEstimateInMinutes: 20
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
      .findOne({_id: mongoHelper.toObjectId(deliverys[0].id)});
    
    expect(foundDelivery?.orderId)
      .toBe(deliverys[0].orderId);
    expect(foundDelivery?.driverId)
      .toBe(deliverys[0].driverId);
    expect(foundDelivery?.status)
      .toBe(deliverys[0].status);
    expect(foundDelivery?.timeEstimateInMinutes)
      .toBe(deliverys[0].timeEstimateInMinutes);
  });

  test('Should return all deliverys in the database', async () => {

    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new deliverys to database
    await DeliveryCollection.insertOne(DeliveryMapper.toDeliveryDocument(deliverys[0]));
    await DeliveryCollection.insertOne(DeliveryMapper.toDeliveryDocument(deliverys[1]));


    const alldeliverys = await repository.findAllDeliverys();
    
    expect(alldeliverys[0].id).toEqual(deliverys[0].id);
    expect(alldeliverys[1].id).toEqual(deliverys[1].id);
  });

  test('Should find a Delivery by id', async () => {

    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(DeliveryMapper.toDeliveryDocument(deliverys[0]));

    const foundDelivery = await repository.findDeliveryById(deliverys[0].id);

    expect(foundDelivery?.orderId)
      .toBe(deliverys[0].orderId);
    expect(foundDelivery?.driverId)
      .toBe(deliverys[0].driverId);
    expect(foundDelivery?.status)
      .toBe(deliverys[0].status);
    expect(foundDelivery?.timeEstimateInMinutes)
      .toBe(deliverys[0].timeEstimateInMinutes);
  });

  test('Should update Delivery by id', async () => {
    
    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(DeliveryMapper.toDeliveryDocument(deliverys[0]));

    const updatedorderI= generateHexId();
    const updatedDriverId = generateHexId();

    const updatedDelivery = { 
      orderId: updatedorderI,
      driverId: updatedDriverId,
      status: 'delivered-updated',
      timeEstimateInMinutes: 999
    }

    await repository.update(deliverys[0].id, updatedDelivery);

    const foundDelivery = await repository.findDeliveryById(deliverys[0].id);

    expect(foundDelivery?.orderId)
      .toBe(updatedDelivery.orderId);
    expect(foundDelivery?.driverId)
      .toBe(updatedDelivery.driverId);
    expect(foundDelivery?.status)
      .toBe(updatedDelivery.status);
    expect(foundDelivery?.timeEstimateInMinutes)
      .toBe(updatedDelivery.timeEstimateInMinutes);
  });

  test('Should remove Delivery by id', async () => {
    
    const DeliveryCollection = mongoHelper.getCollection('delivery');

    // Adding new Delivery to database
    await DeliveryCollection.insertOne(DeliveryMapper.toDeliveryDocument(deliverys[0]));

    await repository.remove(deliverys[0].id);

    const foundDelivery = await repository.findDeliveryById(deliverys[0].id);

    expect(foundDelivery)
      .toBeFalsy();
  });
  
})