import { DeliveryRepository } from '../../../application/_ports/delivery-repository';
import { DeliveryProps } from '../../../domain/entities/delivery-props';
import { DeliveryMapper } from './helpers/mappers/delivery-mapper';
import { mongoHelper } from './helpers/mongo-helper';

export class MongodbDeliveryRepository implements DeliveryRepository {
  async findAllDeliverys(): Promise<DeliveryProps[]> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    const result = await deliveryCollection.find().toArray();

    if (result) {
      const deliverys = result.map((elem) => {
        return DeliveryMapper.toDelivery(elem);
      });

      return deliverys;
    }
    return [];
  }

  async findDeliveryById(delivery: string): Promise<DeliveryProps | null> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    // Its necessary to cast the id string into an ObjectId
    const objId = mongoHelper.toObjectId(delivery);
    const result = await deliveryCollection?.findOne({ _id: objId });

    if (result) {
      return DeliveryMapper.toDelivery(result);
    }

    return null;
  }

  async add(delivery: DeliveryProps): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection?.insertOne(
      DeliveryMapper.toDeliveryDocument(delivery)
    );
  }

  async update(
    deliveryId: string,
    delivery: Partial<DeliveryProps>
  ): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection.updateOne(
      { _id: mongoHelper.toObjectId(deliveryId) },
      { $set: delivery }
    );
  }

  async remove(delivery: string): Promise<void> {
    const deliveryCollection = mongoHelper.getCollection('delivery');
    await deliveryCollection.deleteOne({
      _id: mongoHelper.toObjectId(delivery),
    });
  }
}
