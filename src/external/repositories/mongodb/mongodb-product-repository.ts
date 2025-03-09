import { ProductRepository } from "usecases/ports/product-repository";
import { Product as Product } from "entities/product";
import { ProductCast } from "../../../entities/product";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbProductRepository implements ProductRepository {
  
  async findAllProducts (): Promise<Product[]> {
    const productCollection = mongoHelper.getCollection('product');
    const result = await productCollection.find().toArray();

    if (result){
      const products = result.map((elem) => {
        return ProductCast.toProduct(elem);
      });

      return products;
    }
    return [];
  }

  async findProductById (product: string): Promise<Product | null> {
    const productCollection = mongoHelper.getCollection('product');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(product);
    const result = await productCollection?.findOne({_id: objId});

    if (result){
      return ProductCast.toProduct(result);
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