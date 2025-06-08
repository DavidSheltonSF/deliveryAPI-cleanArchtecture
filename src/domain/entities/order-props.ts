import { AddressProps } from './validation/_interfaces';
import { DishProps } from './dish-props';

export interface OrderProps {
  id?: string;
  customerId: string;
  restaurantId: string;
  dishes: Omit<DishProps, 'restaurantId' | '_id'>[];
  totalPrice: number;
  status: string;
  address: AddressProps;
}
