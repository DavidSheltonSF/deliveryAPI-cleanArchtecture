import { OrderRepository } from "../../../src/application/usecases/ports/order-repository";
import { Order as OrderData } from "../../../src/domain/entities/order";
import { MockData } from "../../_helpers/mockData";


export class SpyOrderRepository implements OrderRepository {
  addParams: Record<string, OrderData> = {};
  findOrderByIdParams: {
    id?: string,
  } = {};
  findOrderByOrderIdParams: {
    orderId?: string,
  } = {};
  updateParams: {
    orderId?: string,
    order?: Omit<OrderData, '_id'>,
  } = {};
  removeParams: {
    orderId?: string,
  } = {};


  async findAllOrders(): Promise<OrderData[]> {
    return [MockData.mockOrder()];
  }

  async findOrderById(id: string): Promise<OrderData | null> {
    this.findOrderByIdParams = {id};
    return MockData.mockOrder();
  }

  async findOrderByOrderId(orderId: string): Promise<OrderData | null> {
    this.findOrderByOrderIdParams = {orderId};
    return MockData.mockOrder();
  }

  async add(order: OrderData): Promise<void> {
    this.addParams = { order };
  }

  async update(orderId: string, order: Omit<OrderData, '_id'>): Promise<void> {
    this.updateParams = {
      orderId,
      order
    };
  }

  async remove(orderId: string): Promise<void> {
    this.removeParams = {orderId};
  }

}