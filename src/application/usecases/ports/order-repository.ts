import {Order as OrderData} from '../../../domain/entities/order';

export interface OrderRepository {
  findAllOrders: () => Promise<OrderData[]>
  findOrderById: (orderId: string) => Promise<OrderData | null>
  add: (order: OrderData) => Promise<void>
  remove: (orderId: string) => Promise<void>
  update: (orderId: string, orderData: Omit<OrderData, '_id'>) => Promise<void>
}