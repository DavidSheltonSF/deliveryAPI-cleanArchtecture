import { Address } from '../Address';
import { UserProps } from './UserProps';

export interface CustomerProps extends UserProps {
  address: Address;
}
