import { UserRole } from '../../domain/_enums';

export interface BaseUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password: string;
}
