import {Delivery as DeliveryData} from '../../entities/delivery';

export interface DeliveryRepository {
  findAllDeliverys: () => Promise<DeliveryData[]>
  findDeliveryById: (deliveryId: string) => Promise<DeliveryData>
  add: (delivery: DeliveryData) => Promise<void>
  remove: (deliveryId: string) => Promise<void>
  update: (deliveryId: string, deliveryData: DeliveryData) => Promise<void>
}