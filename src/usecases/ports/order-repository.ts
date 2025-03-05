import {Order as OrderData} from '../../entities/order';

export interface OrderRepository {
  findAllOrders: () => Promise<OrderData[]>
  findOrderById: (orderId: string) => Promise<OrderData>
  add: (order: OrderData) => Promise<void>
  remove: (orderId: string) => Promise<void>
  update: (orderId: string, orderData: OrderData) => Promise<void>
}