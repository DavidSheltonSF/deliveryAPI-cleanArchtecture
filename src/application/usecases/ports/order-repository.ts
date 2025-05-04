import { OrderProps } from '../../../domain/entities/orderProps';

export interface OrderRepository {
  findAllOrders: () => Promise<OrderProps[]>;
  findOrderById: (orderId: string) => Promise<OrderProps | null>;
  add: (order: OrderProps) => Promise<void>;
  remove: (orderId: string) => Promise<void>;
  update: (orderId: string, orderProps: Omit<OrderProps, '_id'>) => Promise<void>;
}