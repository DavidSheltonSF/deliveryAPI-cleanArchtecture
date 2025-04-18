import { OrderRepository } from "../../../application/usecases/ports/order-repository";
import { Order as Order } from "../../../domain/entities/order";
import { OrderMapper } from "../../../domain/entities/order";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbOrderRepository implements OrderRepository {
  
  async findAllOrders (): Promise<Order[]> {
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

  async findOrderById (order: string): Promise<Order | null> {
    const orderCollection = mongoHelper.getCollection('order');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(order);
    const result = await orderCollection?.findOne({_id: objId});

    if (result){
      return OrderMapper.toOrder(result);
    }

    return null;
  }

  async add (order: Order): Promise<void> {
    const orderCollection = mongoHelper.getCollection('order');
    await orderCollection?.insertOne(order);
  }

  async update (orderId: string, order: Omit<Order, '_id'>): Promise<void> {
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