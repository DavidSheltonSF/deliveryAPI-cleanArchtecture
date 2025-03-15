import {Product as ProductData} from '../../../domain/entities/product';

export interface ProductRepository {
  findAllProducts: () => Promise<ProductData[]>
  findProductById: (productId: string) => Promise<ProductData>
  add: (product: ProductData) => Promise<void>
  remove: (productId: string) => Promise<void>
  update: (productId: string, productData: ProductData) => Promise<void>
}