import { SpyDeliveryRepository } from "../spy-delivery-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyDeliveryRepository', () => {

  test('Should return all deliverys in the FAKE database', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const allDeliverys = await spyDeliveryRepository.findAllDeliverys();
    
    expect(allDeliverys).toBeTruthy();
  });

  test('Should find a delivery by id', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const deliveryId = "123456789012345678901234"

    const foundDelivery = await spyDeliveryRepository.findDeliveryById(deliveryId);
    
    expect(spyDeliveryRepository.findDeliveryByIdParams.id).toEqual(deliveryId);
    expect(foundDelivery).toBeTruthy();
  });

  test('Should add a new', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const fakeDelivery = MockData.mockDelivery();

    await spyDeliveryRepository.add(fakeDelivery);

    const deliveryInserted = spyDeliveryRepository.addParams.delivery;

    expect(deliveryInserted.orderId)
      .toBe(fakeDelivery.orderId);
    expect(deliveryInserted.driverId)
      .toBe(fakeDelivery.driverId);
    expect(deliveryInserted.status)
      .toBe(fakeDelivery.status);
    expect(deliveryInserted.timeEstimate)
      .toBe(fakeDelivery.timeEstimate);
  });


  test('Should update delivery by id', async () => {

    const spyDeliveryRepository = new SpyDeliveryRepository();

    const updatedData = {
      orderId: 'order123-updated',
      driverId: 'driver456-updated',
      status: 'delivered',
      timeEstimate: 54,
    }

    const fakeDeliveryId = MockData.generateHexId();

    await spyDeliveryRepository.update(fakeDeliveryId, updatedData);

    const updatedDeliveryId = spyDeliveryRepository.updateParams.deliveryId
    const updatedDelivery = spyDeliveryRepository.updateParams.delivery;

    expect(updatedDeliveryId?.toString())
      .toBe(fakeDeliveryId);
    
    expect(updatedDelivery?.orderId)
      .toBe(updatedData.orderId);
    expect(updatedDelivery?.driverId)
      .toBe(updatedData.driverId);
    expect(updatedDelivery?.status)
      .toBe(updatedData.status);
    expect(updatedDelivery?.timeEstimate)
      .toBe(updatedData.timeEstimate);
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