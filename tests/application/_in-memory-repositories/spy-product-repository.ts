import { ProductRepository } from "../../../src/application/usecases/ports/product-repository";
import { Product as ProductData } from "../../../src/domain/entities/product";
import { MockData } from "../../_helpers/mockData";


export class SpyProductRepository implements ProductRepository {
  addParams: Record<string, ProductData> = {};
  findProductByIdParams: {
    id?: string,
  } = {};
  updateParams: {
    productId?: string,
    product?: Omit<ProductData, '_id'>,
  } = {};
  removeParams: {
    productId?: string,
  } = {};


  async findAllProducts(): Promise<ProductData[]> {
    return [MockData.mockProduct()];
  }

  async findProductById(id: string): Promise<ProductData | null> {
    this.findProductByIdParams = {id};
    return MockData.mockProduct();
  }

  async add(product: ProductData): Promise<void> {
    this.addParams = { product };
  }

  async update(productId: string, product: Omit<ProductData, '_id'>): Promise<void> {
    this.updateParams = {
      productId,
      product
    };
  }

  async remove(productId: string): Promise<void> {
    this.removeParams = {productId};
  }

}