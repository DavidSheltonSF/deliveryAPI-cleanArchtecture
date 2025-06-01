import { ObjectId } from 'mongodb';

export interface RestaurantChainProps {
  _id: ObjectId | null,
  name: string,
  cnpj: string,
  iconUrl: string,
  adminId: string,
}