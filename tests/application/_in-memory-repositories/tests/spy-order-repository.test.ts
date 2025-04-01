import { SpyOrderRepository } from "../spy-order-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyOrderRepository', () => {

  test('Should return all orders in the FAKE database', async () => {

    const spyOrderRepository = new SpyOrderRepository();

    const allOrders = await spyOrderRepository.findAllOrders();
    
    expect(allOrders).toBeTruthy();
  });

  test('Should find a order by id', async () => {

    const spyOrderRepository = new SpyOrderRepository();

    const orderId = "123456789012345678901234"

    const foundOrder = await spyOrderRepository.findOrderById(orderId);
    
    expect(spyOrderRepository.findOrderByIdParams.id).toEqual(orderId);
    expect(foundOrder).toBeTruthy();
  });

  test('Should add a new', async () => {

    const spyOrderRepository = new SpyOrderRepository();

    const fakeOrder = MockData.mockOrder();

    await spyOrderRepository.add(fakeOrder);

    const orderInserted = spyOrderRepository.addParams.order;

    expect(orderInserted.customerId)
      .toBe(fakeOrder.customerId);
    expect(orderInserted.restaurantId)
      .toBe(fakeOrder.restaurantId);
    expect(orderInserted.totalPrice)
      .toBe(fakeOrder.totalPrice);
    expect(orderInserted.status)
      .toBe(fakeOrder.status);
    expect(orderInserted.address.city)
      .toBe(fakeOrder.address.city);
    expect(orderInserted.address.state)
      .toBe(fakeOrder.address.state);
    expect(orderInserted.address.street)
      .toBe(fakeOrder.address.street);
    expect(orderInserted.address.zipCode)
      .toBe(fakeOrder.address.zipCode);
  });


  test('Should update order by id', async () => {

    const spyOrderRepository = new SpyOrderRepository();

    const updatedData = {
      customerId: 'costumerId-updated',
      restaurantId: 'restaurantId-updated',
      products: [{
        name: 'name-updated',
        description: 'desc-updated',
        price: 54,
        imageUrl: 'url-updated',
      }],
      totalPrice: 100,
      status: 'status-updated',
      address: {
        city: 'city-updated',
        state: 'state-updated',
        street: 'street-updated',
        zipCode: '554885669-updated'
      }
    }

    const fakeOrderId = MockData.generateHexId();

    await spyOrderRepository.update(fakeOrderId, updatedData);

    const updatedOrderId = spyOrderRepository.updateParams.orderId
    const updatedOrder = spyOrderRepository.updateParams.order;

    expect(updatedOrderId?.toString())
      .toBe(fakeOrderId);
    
    expect(updatedOrder?.customerId)
      .toBe(updatedData.customerId);
    expect(updatedOrder?.restaurantId)
      .toBe(updatedData.restaurantId);
    expect(updatedOrder?.totalPrice)
      .toBe(updatedData.totalPrice);
    expect(updatedOrder?.status)
      .toBe(updatedData.status);
    expect(updatedOrder?.address.city)
      .toBe(updatedData.address.city);
    expect(updatedOrder?.address.state)
      .toBe(updatedData.address.state);
    expect(updatedOrder?.address.street)
      .toBe(updatedData.address.street);
    expect(updatedOrder?.address.zipCode)
      .toBe(updatedData.address.zipCode);
  });
  
  test('Should remove order by id', async () => {

    const spyOrderRepository = new SpyOrderRepository();

    const fakeOrderId = MockData.generateHexId();

    await spyOrderRepository.remove(fakeOrderId);

    const removedOrderId = spyOrderRepository.removeParams.orderId;
    
    expect(removedOrderId)
      .toBe(fakeOrderId);
  });

});