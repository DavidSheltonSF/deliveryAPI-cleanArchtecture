import {Delivery as DeliveryData} from '../../../domain/entities/deliveryProps';

export interface DeliveryRepository {
  findAllDeliverys: () => Promise<DeliveryData[]>
  findDeliveryById: (deliveryId: string) => Promise<DeliveryData | null>
  add: (delivery: DeliveryData) => Promise<void>
  remove: (deliveryId: string) => Promise<void>
  update: (deliveryId: string, deliveryData: Omit<DeliveryData, '_id'>) => Promise<void>
}