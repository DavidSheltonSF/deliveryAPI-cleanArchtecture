import { Address } from "./validators/_interfaces"

export interface Restaurant {
  name: string,
  cnpj: string,
  isOpen: boolean,
  imageUrl: string,
  ownerId: string,
  address: Address
}