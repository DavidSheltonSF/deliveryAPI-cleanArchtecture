import { DeliveryRepository } from "../../../src/application/_ports/delivery-repository";
import { DeliveryProps } from "../../../src/domain/entities/delivery-props";

export class SpyDeliveryRepository implements DeliveryRepository {
  deliveryDatabase: DeliveryProps[] = [];
  addParams: {
    delivery?: DeliveryProps
  } = {};
  findDeliveryByIdParams: {
    id?: string,
  } = {};
  updateParams: {
    deliveryId?: string,
    delivery?: Omit<DeliveryProps, '_id'>,
  } = {};
  removeParams: {
    deliveryId?: string,
  } = {};

  async findAllDeliverys(): Promise<DeliveryProps[]> {
    return this.deliveryDatabase;
  }

  async findDeliveryById(id: string): Promise<DeliveryProps | null> {
    this.findDeliveryByIdParams = { id };
    for (let i = 0; i < this.deliveryDatabase.length; i++) {
      if (this.deliveryDatabase[i]._id?.toString() === id) {
        return this.deliveryDatabase[i];
      }
    }
    return null;
  }

  async add(delivery: DeliveryProps): Promise<void> {
    this.addParams = { delivery };
  }

  async update(deliveryId: string, delivery: Omit<DeliveryProps, '_id'>): Promise<void> {
    this.updateParams = {
      deliveryId,
      delivery
    };
  }

  async remove(deliveryId: string): Promise<void> {
    this.removeParams = { deliveryId };
  }
}