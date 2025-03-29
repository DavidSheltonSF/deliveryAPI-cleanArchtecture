import {Product as ProductData} from '../../../domain/entities/product';

export interface ProductRepository {
  findAllProducts: () => Promise<ProductData[]>
  findProductById: (productId: string) => Promise<ProductData | null>
  add: (product: ProductData) => Promise<void>
  remove: (productId: string) => Promise<void>
  update: (productId: string, productData: Omit<ProductData, '_id'>) => Promise<void>
}