import { SpyDishRepository } from "../spy-dish-repository";
import { MockData } from '../../../_helpers/mockData'

describe('Testing SpyDishRepository', () => {

  test('Should return all dishes in the FAKE database', async () => {

    const spyDishRepository = new SpyDishRepository();

    const allDishes = await spyDishRepository.findAllDishs();
    
    expect(allDishes).toBeTruthy();
  });

  test('Should find a dish by id', async () => {

    const spyDishRepository = new SpyDishRepository();

    const [mockedDish] = MockData.mockDish();

    spyDishRepository.dishDatabase.push(mockedDish);

    const dishIdStr = mockedDish.id?.toString();

    if (!dishIdStr) {
      throw Error('Dish id is undefined');
    }

    const foundDish = await spyDishRepository.findDishById(dishIdStr);
    
    expect(spyDishRepository.findDishByIdParams.id).toEqual(dishIdStr);
    expect(foundDish?.id).toBe(mockedDish.id);
  });

  test('Should add a new dish', async () => {

    const spyDishRepository = new SpyDishRepository();

    const [fakeDish] = MockData.mockDish();

    await spyDishRepository.add(fakeDish);

    const dishInserted = spyDishRepository.addParams.newDish;

    expect(dishInserted?.name)
      .toBe(fakeDish.name);
    expect(dishInserted?.description)
      .toBe(fakeDish.description);
    expect(dishInserted?.price)
      .toBe(fakeDish.price);
    expect(dishInserted?.restaurantId)
      .toBe(fakeDish.restaurantId);
    expect(dishInserted?.imageUrl)
      .toBe(fakeDish.imageUrl);
  });

  test('Should update dish by id', async () => {

    const spyDishRepository = new SpyDishRepository();

    const updatedData = {
      id: null,
      name: 'dishname-updated',
      description: 'descr-updated',
      price: 55,
      restaurantId: '21555777777-updated',
      imageUrl: 'url-updated',
    }

    const fakeDishId = MockData.generateHexId();

    await spyDishRepository.update(fakeDishId, updatedData);

    const updatedDishId = spyDishRepository.updateParams.dishId;
    const updatedDish = spyDishRepository.updateParams.dish;

    expect(updatedDishId?.toString())
      .toBe(fakeDishId);
    
    expect(updatedDish?.name)
      .toBe(updatedData.name);
    expect(updatedDish?.description)
      .toBe(updatedData.description);
    expect(updatedDish?.price)
      .toBe(updatedData.price);
    expect(updatedDish?.restaurantId)
      .toBe(updatedData.restaurantId);
    expect(updatedDish?.imageUrl)
      .toBe(updatedData.imageUrl);
  });
  
  test('Should remove dish by id', async () => {

    const spyDishRepository = new SpyDishRepository();

    const fakeDishId = MockData.generateHexId();

    await spyDishRepository.remove(fakeDishId);

    const removedDishId = spyDishRepository.removeParams.dishId;
    
    expect(removedDishId)
      .toBe(fakeDishId);
  });

});