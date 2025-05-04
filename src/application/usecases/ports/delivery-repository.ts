import { DeliveryProps } from '../../../domain/entities/deliveryProps';

export interface DeliveryRepository {
  findAllDeliverys: () => Promise<DeliveryProps[]>
  findDeliveryById: (deliveryId: string) => Promise<DeliveryProps | null>
  add: (delivery: DeliveryProps) => Promise<void>
  remove: (deliveryId: string) => Promise<void>
  update: (deliveryId: string, deliveryData: Omit<DeliveryProps, '_id'>) => Promise<void>
}