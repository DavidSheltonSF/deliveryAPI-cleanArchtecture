export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX_KEY = 'pix_key',
  BANK_TRANSFER = 'bank_transfer',
}

export enum UserRole {
  admin = 'admin',
  customer = 'customer',
  restaurant_admin = 'restaurant_admin',
  restaurant_chain_admin = 'restaurant_chain_admin',
  driver = 'driver',
}

export enum PaymentStatus {
  PAYD = 'paid',
  PENDING = 'pending',
  FAILED = 'failed',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
}

export enum DeliveryStatus {
  ASSIGNED = 'assigned',
  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',
}
