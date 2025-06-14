import { SpyRestaurantRepository } from "../spy-restaurant-repository";
import { MockData } from '../../../_helpers/mockData'

describe('Testing SpyRestaurantRepository', () => {

  test('Should return all restaurant in the FAKE database', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();

    const allRestaurant = await spyRestaurantRepository.findAllRestaurants();
    
    expect(allRestaurant).toBeTruthy();
  });

  test('Should find a restaurant by id', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();
    
    const [mockedRestaurant] = MockData.mockRestaurant();

    spyRestaurantRepository.restaurantDatabase.push(mockedRestaurant);

    const restaurantIdStr = mockedRestaurant.id?.toString();

    if(!restaurantIdStr){
      throw Error('Restaurant id is undefined');
    }

    const foundRestaurant = await spyRestaurantRepository.findRestaurantById(restaurantIdStr);
    
    expect(spyRestaurantRepository.findRestaurantByIdParams.id).toEqual(restaurantIdStr);
    expect(foundRestaurant?.id).toBe(mockedRestaurant.id);
  });
  

  test('Should find a restaurant by adminId', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();
    
    const [mockedRestaurant] = MockData.mockRestaurant();

    spyRestaurantRepository.restaurantDatabase.push(mockedRestaurant);

    const restaurantAdminId = mockedRestaurant.adminId;

    const foundRestaurant = await spyRestaurantRepository.findRestaurantByAdminId(restaurantAdminId);
    
    expect(spyRestaurantRepository.findRestaurantByAdminIdParams.adminId).toEqual(restaurantAdminId);
    expect(foundRestaurant?.adminId).toBe(mockedRestaurant.adminId);
  });


  test('Should add a new', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();

    const [fakeRestaurant] = MockData.mockRestaurant();

    await spyRestaurantRepository.add(fakeRestaurant);

    const restaurantInserted = spyRestaurantRepository.addParams.newRestaurant;
    
    expect(restaurantInserted.restaurantChainId)
      .toBe(fakeRestaurant.restaurantChainId);
    expect(restaurantInserted.adminId)
      .toBe(fakeRestaurant.adminId);
    expect(restaurantInserted.isOpen)
      .toBe(fakeRestaurant.isOpen);
    expect(restaurantInserted.phone)
      .toBe(fakeRestaurant.phone);
    expect(restaurantInserted.imageUrl)
      .toBe(fakeRestaurant.imageUrl);
    expect(restaurantInserted.address.city)
      .toBe(fakeRestaurant.address.city);
    expect(restaurantInserted.address.state)
      .toBe(fakeRestaurant.address.state);
    expect(restaurantInserted.address.street)
      .toBe(fakeRestaurant.address.street);
    expect(restaurantInserted.address.zipCode)
      .toBe(fakeRestaurant.address.zipCode);
  });


  test('Should update restaurant by id', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();

    const updatedData = {
      id: null,
      restaurantChainId: '123456789012345678901234',
      adminId: '123456789012345678901234',
      isOpen: true,
      phone: '21968540557',
      imageUrl: '21555777777-updated',
      address: {
        city: 'test city',
        state: 'Rio Teste',
        street: 'testing',
        zipCode: '855444577785'
      }
      
    }

    const fakeId = MockData.generateHexId();

    await spyRestaurantRepository.update(fakeId, updatedData);

    const updatedRestaurantId = spyRestaurantRepository.updateParams.restaurantId
    const updatedRestaurant = spyRestaurantRepository.updateParams.restaurant;

    expect(updatedRestaurantId?.toString())
      .toBe(fakeId);
    
    expect(updatedRestaurant?.restaurantChainId)
      .toBe(updatedData.restaurantChainId);
    expect(updatedRestaurant?.adminId)
      .toBe(updatedData.adminId);
    expect(updatedRestaurant?.isOpen)
      .toBe(updatedData.isOpen);
    expect(updatedRestaurant?.phone)
      .toBe(updatedData.phone);
    expect(updatedRestaurant?.imageUrl)
      .toBe(updatedData.imageUrl);
    expect(updatedRestaurant?.address.city)
      .toBe(updatedData.address.city);
    expect(updatedRestaurant?.address.state)
      .toBe(updatedData.address.state);
    expect(updatedRestaurant?.address.street)
      .toBe(updatedData.address.street);
    expect(updatedRestaurant?.address.zipCode)
      .toBe(updatedData.address.zipCode);
  });
  
  test('Should remove restaurant by id', async () => {

    const spyRestaurantRepository = new SpyRestaurantRepository();

    const fakeRestaurantId = MockData.generateHexId();

    await spyRestaurantRepository.remove(fakeRestaurantId);

    const removedRestaurantId = spyRestaurantRepository.removeParams.restaurantId;
    
    expect(removedRestaurantId)
      .toBe(fakeRestaurantId);
  });

});