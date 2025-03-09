import { DeliveryRepository } from "usecases/ports/delivery-repository";
import { Delivery as Delivery } from "entities/delivery";
import { DeliveryCast } from "../../../entities/delivery";
import { mongoHelper } from "./helpers/mongo-helper";

export class MongodbDeliveryRepository implements DeliveryRepository {
  
  async findAllDeliverys (): Promise<Delivery[]> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    const result = await deliveryCollection.find().toArray();

    if (result){
      const deliverys = result.map((elem) => {
        return DeliveryCast.toDelivery(elem);
      });

      return deliverys;
    }
    return [];
  }

  async findDeliveryById (delivery: string): Promise<Delivery | null> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(delivery);
    const result = await deliveryCollection?.findOne({_id: objId});

    if (result){
      return DeliveryCast.toDelivery(result);
    }

    return null;
  }

  async add (delivery: Delivery): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection?.insertOne(delivery);
  }

  async update (deliveryId: string, delivery: Delivery): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection.updateOne(
      {_id: mongoHelper.toObjectId(deliveryId)},
      {$set: delivery}
    );
  }

  async remove (delivery: string): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection.deleteOne(
      {_id: mongoHelper.toObjectId(delivery)}
    );
  }
}