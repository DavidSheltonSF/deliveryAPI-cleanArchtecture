import { SpyRestaurantChainRepository } from "../spy-restaurant-chain-repository";
import { MockData } from '../../../_helpers/mockData'

describe('Testing SpyRestaurantChainRepository', () => {

  test('Should return all restaurantchains in the FAKE database', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const allRestaurantChains = await spyRestaurantChainRepository.findAllRestaurantChains();
    
    expect(allRestaurantChains).toBeTruthy();
  });

  test('Should find a restaurantchain by id', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const restaurantchainId = "123456789012345678901234"

    const foundRestaurantChain = await spyRestaurantChainRepository.findRestaurantChainById(restaurantchainId);
    
    expect(spyRestaurantChainRepository.findRestaurantChainByIdParams.restaurantChainId).toEqual(restaurantchainId);
    expect(foundRestaurantChain).toBeTruthy();
  });
  

  test('Should find a restaurantchain by adminId', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const adminId = "123456789012345678901234";

    const foundRestaurantChain = await spyRestaurantChainRepository.findRestaurantChainByAdminId(adminId);
    
    expect(spyRestaurantChainRepository.findRestaurantChainByAdminIdParams.adminId).toEqual(adminId);
    expect(foundRestaurantChain).toBeTruthy();
  });


  test('Should add a new', async () => {

    const spyRestaurantChainRepository = new SpyRestaurantChainRepository();

    const fakeRestaurantChain = MockData.mockRestaurantChain();

    await spyRestaurantChainRepository.add(fakeRestaurantChain);

    const restaurantchainInserted = spyRestaurantChainRepository.addParams.restaurantchain;
    
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

    const removedRestaurantChainId = spyRestaurantChainRepository.removeParams.restaurantchainId;
    
    expect(removedRestaurantChainId)
      .toBe(fakeRestaurantChainId);
  });

});