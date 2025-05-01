import { OrderRepository } from "../../../src/application/usecases/ports/order-repository";
import { OrderProps } from "../../../src/domain/entities/orderProps";
import { MockData } from "../../_helpers/mockData";


export class SpyOrderRepository implements OrderRepository {
  addParams: Record<string, OrderProps> = {};
  findOrderByIdParams: {
    id?: string,
  } = {};
  findOrderByOrderIdParams: {
    orderId?: string,
  } = {};
  updateParams: {
    orderId?: string,
    order?: Omit<OrderProps, '_id'>,
  } = {};
  removeParams: {
    orderId?: string,
  } = {};


  async findAllOrders(): Promise<OrderProps[]> {
    return [MockData.mockOrder()];
  }

  async findOrderById(id: string): Promise<OrderProps | null> {
    this.findOrderByIdParams = {id};
    return MockData.mockOrder();
  }

  async findOrderByOrderId(orderId: string): Promise<OrderProps | null> {
    this.findOrderByOrderIdParams = {orderId};
    return MockData.mockOrder();
  }

  async add(order: OrderProps): Promise<void> {
    this.addParams = { order };
  }

  async update(orderId: string, order: Omit<OrderProps, '_id'>): Promise<void> {
    this.updateParams = {
      orderId,
      order
    };
  }

  async remove(orderId: string): Promise<void> {
    this.removeParams = {orderId};
  }

}