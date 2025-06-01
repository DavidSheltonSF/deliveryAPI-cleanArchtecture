import { ObjectId } from 'mongodb';

export interface DishProps {
  _id: ObjectId | null,
  name: string,
  description: string,
  price: number,
  restaurantId: string,
  imageUrl?: string,
}