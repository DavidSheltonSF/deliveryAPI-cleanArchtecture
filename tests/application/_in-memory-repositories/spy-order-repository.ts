import { OrderRepository } from '../../../src/application/_ports/order-repository';
import { OrderProps } from '../../../src/domain/entities/order-props';
import { MockData } from '../../_helpers/mockData';

export class SpyOrderRepository implements OrderRepository {
  orderDatabase: OrderProps[] = [];
  addParams: {
    newOrder?: OrderProps;
  } = {};
  findOrderByIdParams: {
    id?: string;
  } = {};
  findOrderByOrderIdParams: {
    id?: string;
  } = {};
  updateParams: {
    id?: string;
    order?: Omit<OrderProps, 'id'>;
  } = {};
  removeParams: {
    id?: string;
  } = {};

  async findAllOrders(): Promise<OrderProps[]> {
    return this.orderDatabase;
  }

  async findOrderById(id: string): Promise<OrderProps | null> {
    this.findOrderByIdParams = { id };
    for (let i = 0; i < this.orderDatabase.length; i++) {
      if (this.orderDatabase[i].id?.toString() === id) {
        return this.orderDatabase[i];
      }
    }
    return null;
  }

  async findOrderByOrderId(id: string): Promise<OrderProps | null> {
    this.findOrderByOrderIdParams = { id };
    for (let i = 0; i < this.orderDatabase.length; i++) {
      if (this.orderDatabase[i].id?.toString() === id) {
        return this.orderDatabase[i];
      }
    }
    return null;
  }

  async add(newOrder: OrderProps): Promise<OrderProps> {
    this.addParams = { newOrder };

    return {
      id: MockData.generateHexId(),
      ...newOrder,
    };
  }

  async update(id: string, order: Omit<OrderProps, 'id'>): Promise<void> {
    this.updateParams = {
      id,
      order,
    };
  }

  async remove(id: string): Promise<void> {
    this.removeParams = { id };
  }
}
