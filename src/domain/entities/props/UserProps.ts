import { BaseUserProps } from './BaseUserProps';
import { CustomerProfileProps } from './CustomerProfileProps';
import { DriverProfileProps } from './DriverProfileProps';

export type UserProps = BaseUserProps &
  (
    | { role: 'customer'; profile: CustomerProfileProps }
    | { role: 'driver'; profile: DriverProfileProps }
  );


export type PartialUserProps = Partial<UserProps>
