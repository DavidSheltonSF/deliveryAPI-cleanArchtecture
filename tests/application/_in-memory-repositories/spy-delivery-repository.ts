import { DeliveryRepository } from '../../../src/application/_ports/delivery-repository';
import { DeliveryProps } from '../../../src/domain/entities/delivery-props';
import { MockData } from '../../_helpers/mockData';

export class SpyDeliveryRepository implements DeliveryRepository {
  deliveryDatabase: DeliveryProps[] = [];
  addParams: {
    newDelivery?: DeliveryProps;
  } = {};
  findDeliveryByIdParams: {
    id?: string;
  } = {};
  updateParams: {
    deliveryId?: string;
    delivery?: Omit<DeliveryProps, 'id'>;
  } = {};
  removeParams: {
    deliveryId?: string;
  } = {};

  async findAllDeliverys(): Promise<DeliveryProps[]> {
    return this.deliveryDatabase;
  }

  async findDeliveryById(id: string): Promise<DeliveryProps | null> {
    this.findDeliveryByIdParams = { id };
    for (let i = 0; i < this.deliveryDatabase.length; i++) {
      if (this.deliveryDatabase[i].id?.toString() === id) {
        return this.deliveryDatabase[i];
      }
    }
    return null;
  }

  async add(newDelivery: DeliveryProps): Promise<DeliveryProps> {
    this.addParams = { newDelivery };

    return {
      id: MockData.generateHexId(),
      ...newDelivery,
    };
  }

  async update(
    deliveryId: string,
    delivery: Omit<DeliveryProps, 'id'>
  ): Promise<void> {
    this.updateParams = {
      deliveryId,
      delivery,
    };
  }

  async remove(deliveryId: string): Promise<void> {
    this.removeParams = { deliveryId };
  }
}
