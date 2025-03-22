import { ProductRepository } from "../../../application/usecases/ports/product-repository";
import { Product as Product } from "../../../domain/entities/product";
import { ProductMapper } from "../../../domain/entities/product";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbProductRepository implements ProductRepository {
  
  async findAllProducts (): Promise<Product[]> {
    const productCollection = mongoHelper.getCollection('product');
    const result = await productCollection.find().toArray();

    if (result){
      const products = result.map((elem) => {
        return ProductMapper.toProduct(elem);
      });

      return products;
    }
    return [];
  }

  async findProductById (product: string): Promise<Product | null> {
    const productCollection = mongoHelper.getCollection('product');
    // Its necessary to mapper the id string into an ObjectId
    const objId = mongoHelper.toObjectId(product);
    const result = await productCollection?.findOne({_id: objId});

    if (result){
      return ProductMapper.toProduct(result);
    }

    return null;
  }

  async add (product: Product): Promise<void> {
    const productCollection = mongoHelper.getCollection('product');
    await productCollection?.insertOne(product);
  }

  async update (productId: string, product: Product): Promise<void> {
    const productCollection = mongoHelper.getCollection('product');
    await productCollection.updateOne(
      {_id: mongoHelper.toObjectId(productId)},
      {$set: product}
    );
  }

  async remove (product: string): Promise<void> {
    const productCollection = mongoHelper.getCollection('product');
    await productCollection.deleteOne(
      {_id: mongoHelper.toObjectId(product)}
    );
  }
}