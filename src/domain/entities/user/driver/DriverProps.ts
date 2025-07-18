import { BankAccountProps } from '../../bankAccount/BankAccountProps';
import { UserProps } from '../UserProps';
import { Address } from '../../address/Address';

export interface CustomerProps extends UserProps {
  address?: Address;
  bankAccount?: BankAccountProps;
}
