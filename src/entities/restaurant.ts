import { Address } from "./address";

export interface Restaurant {
  name: string,
  cnpj: string,
  isOpen: boolean,
  imageUrl: string,
  ownerId: string,
  address: Address
}