import { DeliveryRepository } from "../../../src/application/usecases/ports/delivery-repository";
import { DeliveryProps } from "../../../src/domain/entities/deliveryProps";
import { MockData } from "../../_helpers/mockData";


export class SpyDeliveryRepository implements DeliveryRepository {
  addParams: Record<string, DeliveryProps> = {};
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
    return [MockData.mockDelivery()];
  }

  async findDeliveryById(id: string): Promise<DeliveryProps | null> {
    this.findDeliveryByIdParams = {id};
    return MockData.mockDelivery();
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
    this.removeParams = {deliveryId};
  }

}