import { OrderRepository } from "../../../application/_ports/order-repository";
import { OrderProps } from "../../../domain/entities/order-props";
import { OrderMapper } from "./helpers/mappers/order-mapper";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbOrderRepository implements OrderRepository {
  
  async findAllOrders (): Promise<OrderProps[]> {
    const orderCollection = mongoHelper.getCollection('order');
    const result = await orderCollection.find().toArray();

    if (result){
      const orders = result.map((elem) => {
        return OrderMapper.toOrder(elem);
      });

      return orders;
    }
    return [];
  }

  async findOrderById (order: string): Promise<OrderProps | null> {
    const orderCollection = mongoHelper.getCollection('order');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(order);
    const result = await orderCollection?.findOne({_id: objId});

    if (result){
      return OrderMapper.toOrder(result);
    }

    return null;
  }

  async add (order: OrderProps): Promise<void> {
    const orderCollection = mongoHelper.getCollection('order');
    await orderCollection?.insertOne(OrderMapper.toOrderDocument(order));
  }

  async update (orderId: string, order: Omit<OrderProps, '_id'>): Promise<void> {
    const orderCollection = mongoHelper.getCollection('order');
    await orderCollection.updateOne(
      {_id: mongoHelper.toObjectId(orderId)},
      {$set: order}
    );
  }

  async remove (order: string): Promise<void> {
    const orderCollection = mongoHelper.getCollection('order');
    await orderCollection.deleteOne(
      {_id: mongoHelper.toObjectId(order)}
    );
  }
}