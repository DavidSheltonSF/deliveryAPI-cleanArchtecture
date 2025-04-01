import { SpyProductRepository } from "../spy-product-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyProductRepository', () => {

  test('Should return all products in the FAKE database', async () => {

    const spyProductRepository = new SpyProductRepository();

    const allProducts = await spyProductRepository.findAllProducts();
    
    expect(allProducts).toBeTruthy();
  });

  test('Should find a product by id', async () => {

    const spyProductRepository = new SpyProductRepository();

    const productId = "123456789012345678901234"

    const foundProduct = await spyProductRepository.findProductById(productId);
    
    expect(spyProductRepository.findProductByIdParams.id).toEqual(productId);
    expect(foundProduct).toBeTruthy();
  });

  test('Should add a new', async () => {

    const spyProductRepository = new SpyProductRepository();

    const fakeProduct = MockData.mockProduct();

    await spyProductRepository.add(fakeProduct);

    const productInserted = spyProductRepository.addParams.product;

    
    expect(productInserted.name)
      .toBe(fakeProduct.name);
    expect(productInserted.description)
      .toBe(fakeProduct.description);
    expect(productInserted.price)
      .toBe(fakeProduct.price);
    expect(productInserted.restaurantId)
      .toBe(fakeProduct.restaurantId);
    expect(productInserted.imageUrl)
      .toBe(fakeProduct.imageUrl);
  });


  test('Should update product by id', async () => {

    const spyProductRepository = new SpyProductRepository();

    const updatedData = {
      _id: null,
      name: 'productname-updated',
      description: 'descr-updated',
      price: 55,
      restaurantId: '21555777777-updated',
      imageUrl: 'url-updated',
    }

    const fakeProductId = MockData.generateHexId();

    await spyProductRepository.update(fakeProductId, updatedData);

    const updatedProductId = spyProductRepository.updateParams.productId
    const updatedProduct = spyProductRepository.updateParams.product;

    expect(updatedProductId?.toString())
      .toBe(fakeProductId);
    
    expect(updatedProduct?.name)
      .toBe(updatedData.name);
    expect(updatedProduct?.description)
      .toBe(updatedData.description);
    expect(updatedProduct?.price)
      .toBe(updatedData.price);
    expect(updatedProduct?.restaurantId)
      .toBe(updatedData.restaurantId);
    expect(updatedProduct?.imageUrl)
      .toBe(updatedData.imageUrl);
  });
  
  test('Should remove product by id', async () => {

    const spyProductRepository = new SpyProductRepository();

    const fakeProductId = MockData.generateHexId();

    await spyProductRepository.remove(fakeProductId);

    const removedProductId = spyProductRepository.removeParams.productId;
    
    expect(removedProductId)
      .toBe(fakeProductId);
  });

});