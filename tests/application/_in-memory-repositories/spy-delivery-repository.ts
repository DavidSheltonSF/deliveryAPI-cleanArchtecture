import { DeliveryRepository } from "../../../src/application/usecases/ports/delivery-repository";
import { Delivery as DeliveryData } from "../../../src/domain/entities/delivery";
import { MockData } from "../../_helpers/mockData";


export class SpyDeliveryRepository implements DeliveryRepository {
  addParams: Record<string, DeliveryData> = {};
  findDeliveryByIdParams: {
    id?: string,
  } = {};
  updateParams: {
    deliveryId?: string,
    delivery?: Omit<DeliveryData, '_id'>,
  } = {};
  removeParams: {
    deliveryId?: string,
  } = {};


  async findAllDeliverys(): Promise<DeliveryData[]> {
    return [MockData.mockDelivery()];
  }

  async findDeliveryById(id: string): Promise<DeliveryData | null> {
    this.findDeliveryByIdParams = {id};
    return MockData.mockDelivery();
  }

  async add(delivery: DeliveryData): Promise<void> {
    this.addParams = { delivery };
  }

  async update(deliveryId: string, delivery: Omit<DeliveryData, '_id'>): Promise<void> {
    this.updateParams = {
      deliveryId,
      delivery
    };
  }

  async remove(deliveryId: string): Promise<void> {
    this.removeParams = {deliveryId};
  }

}