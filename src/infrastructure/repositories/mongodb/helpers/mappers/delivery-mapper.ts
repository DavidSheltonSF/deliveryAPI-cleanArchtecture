import { WithId, Document } from 'mongodb';
import { DeliveryProps } from '../../../../../domain/entities/delivery-props';
import { mongoHelper } from '../mongo-helper';

export class DeliveryMapper {
  /* Converts database documents into Delivery type objects */
  static toDelivery(data: WithId<Document>): DeliveryProps {
    const id = data._id.toString();
    const { orderId, driverId, status, timeEstimateInMinutes } = data;

    return {
      id,
      orderId,
      driverId,
      status,
      timeEstimateInMinutes,
    };
  }

  static toDeliveryDocument(data: DeliveryProps): WithId<Document> {
    const _id = mongoHelper.toObjectId(data.id);
    const { orderId, driverId, status, timeEstimateInMinutes } = data;

    return {
      _id,
      orderId,
      driverId,
      status,
      timeEstimateInMinutes,
    };
  }
}
