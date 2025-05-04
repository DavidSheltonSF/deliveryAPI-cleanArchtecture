import { SpyRestaurantChainRepository } from "../spy-restaurant-chain-repository";
import { MockData } from '../../../_helpers/mockData'

describe('Testing SpyRestaurantChainRepository', () => {

  test('Should return all restaurantchains in the FAKE database', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const allRestaurantChains = await spyRestaurantChainRepository.findAllRestaurantChains();
    
    expect(allRestaurantChains).toBeTruthy();
  });

  test('Should find a restaurantchain by id', async () => {

    const spyRestaurantRepository = new SpyRestaurantChainRepository();
        
    const mockedRestaurantChain = MockData.mockRestaurantChain();

    spyRestaurantRepository.restaurantChainDatabase.push(mockedRestaurantChain);

    const restaurantIdChainStr = mockedRestaurantChain._id?.toString();

    if(!restaurantIdChainStr){
      throw Error('Restaurant chain id is undefined');
    }

    const foundRestaurant = await spyRestaurantRepository.findRestaurantChainById(restaurantIdChainStr);
    
    expect(spyRestaurantRepository.findRestaurantChainByIdParams.id).toEqual(restaurantIdChainStr);
    expect(foundRestaurant?._id).toBe(mockedRestaurantChain._id);
  });
  

  test('Should find a restaurantchain by adminId', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();
        
    const mockedRestaurantChain = MockData.mockRestaurantChain();

    spyRestaurantChainRepository.restaurantChainDatabase.push(mockedRestaurantChain);

    const restaurantChainAdminId = mockedRestaurantChain.adminId;

    const foundRestaurantChain = await spyRestaurantChainRepository.findRestaurantChainByAdminId(restaurantChainAdminId);
    
    expect(spyRestaurantChainRepository.findRestaurantChainByAdminIdParams.adminId).toEqual(restaurantChainAdminId);
    expect(foundRestaurantChain?.adminId).toBe(mockedRestaurantChain.adminId);
  });


  test('Should add a new', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const fakeRestaurantChain = MockData.mockRestaurantChain();

    await spyRestaurantChainRepository.add(fakeRestaurantChain);

    const restaurantchainInserted = spyRestaurantChainRepository.addParams.restaurantChain;
    
    expect(restaurantchainInserted.adminId)
      .toBe(fakeRestaurantChain.adminId);
    expect(restaurantchainInserted.cnpj)
      .toBe(fakeRestaurantChain.cnpj);
    expect(restaurantchainInserted.iconUrl)
      .toBe(fakeRestaurantChain.iconUrl);
    expect(restaurantchainInserted.name)
      .toBe(fakeRestaurantChain.name);
  });


  test('Should update restaurantchain by id', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const updatedData = {
      _id: null,
      name: 'restaurantchainname-updated',
      cnpj: '88888888888-updated',
      iconUrl: '21555777777-updated',
      adminId: '123456789012345678901234',
    }

    const fakeId = MockData.generateHexId();

    await spyRestaurantChainRepository.update(fakeId, updatedData);

    const restaurantchainUpdatedId = spyRestaurantChainRepository.updateParams.restaurantChainId
    const updatedRestaurantChain = spyRestaurantChainRepository.updateParams.restaurantChain;

    expect(restaurantchainUpdatedId?.toString())
      .toBe(fakeId);
    
    expect(updatedRestaurantChain?.adminId)
      .toBe(updatedData.adminId);
    expect(updatedRestaurantChain?.cnpj)
      .toBe(updatedData.cnpj);
    expect(updatedRestaurantChain?.iconUrl)
      .toBe(updatedData.iconUrl);
    expect(updatedRestaurantChain?.name)
      .toBe(updatedData.name);
  });
  
  test('Should remove restaurantchain by id', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();
    
    const fakeRestaurantChainId = MockData.generateHexId();

    await spyRestaurantChainRepository.remove(fakeRestaurantChainId);

    const removedRestaurantChainId = spyRestaurantChainRepository.removeParams.restaurantChainId;
    
    expect(removedRestaurantChainId)
      .toBe(fakeRestaurantChainId);
  });

});