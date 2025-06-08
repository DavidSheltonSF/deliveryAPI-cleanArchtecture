import { SpyDeliveryRepository } from "../spy-delivery-repository";
import { MockData } from '../../../_helpers/mockData'

describe('Testing SpyDeliveryRepository', () => {

  test('Should return all deliveries in the FAKE database', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const allDeliverys = await spyDeliveryRepository.findAllDeliverys();
    
    expect(allDeliverys).toBeTruthy();
  });

  test('Should find a delivery by id', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const [mockedDelivery] = MockData.mockDelivery();

    spyDeliveryRepository.deliveryDatabase.push(mockedDelivery);

    const deliveryIdStr = mockedDelivery._id?.toString();

    if (!deliveryIdStr) {
      throw Error('Delivery id is undefined');
    }

    const foundDelivery = await spyDeliveryRepository.findDeliveryById(deliveryIdStr);
    
    expect(spyDeliveryRepository.findDeliveryByIdParams.id).toEqual(deliveryIdStr);
    expect(foundDelivery?._id).toBe(mockedDelivery._id);
  });

  test('Should add a new delivery', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const [fakeDelivery] = MockData.mockDelivery();

    await spyDeliveryRepository.add(fakeDelivery);

    const deliveryInserted = spyDeliveryRepository.addParams.delivery;

    expect(deliveryInserted?.orderId)
      .toBe(fakeDelivery.orderId);
    expect(deliveryInserted?.driverId)
      .toBe(fakeDelivery.driverId);
    expect(deliveryInserted?.status)
      .toBe(fakeDelivery.status);
    expect(deliveryInserted?.timeEstimateInMinutes)
      .toBe(fakeDelivery.timeEstimateInMinutes);
  });

  test('Should update delivery by id', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const updatedData = {
      _id: null,
      orderId: 'order123-updated',
      driverId: 'driver456-updated',
      status: 'delivered',
      timeEstimateInMinutes: 54,
    }

    const fakeDeliveryId = MockData.generateHexId();

    await spyDeliveryRepository.update(fakeDeliveryId, updatedData);

    const updatedDeliveryId = spyDeliveryRepository.updateParams.deliveryId;
    const updatedDelivery = spyDeliveryRepository.updateParams.delivery;

    expect(updatedDeliveryId?.toString())
      .toBe(fakeDeliveryId);
    
    expect(updatedDelivery?.orderId)
      .toBe(updatedData.orderId);
    expect(updatedDelivery?.driverId)
      .toBe(updatedData.driverId);
    expect(updatedDelivery?.status)
      .toBe(updatedData.status);
    expect(updatedDelivery?.timeEstimateInMinutes)
      .toBe(updatedData.timeEstimateInMinutes);
  });
  
  test('Should remove delivery by id', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const fakeDeliveryId = MockData.generateHexId();

    await spyDeliveryRepository.remove(fakeDeliveryId);

    const removedDeliveryId = spyDeliveryRepository.removeParams.deliveryId;
    
    expect(removedDeliveryId)
      .toBe(fakeDeliveryId);
  });

});