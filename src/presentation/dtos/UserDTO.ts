import { BaseUserDTO } from './BaseUserDTO';
import { CustomerProfileDTO } from './CustomerProfileDTO';
import { DriverProfileDTO } from './DriverProfileDTO';

export type UserDTO = BaseUserDTO &
  (
    | { role: 'customer'; profile: CustomerProfileDTO }
    | { role: 'driver'; profile: DriverProfileDTO }
  );
