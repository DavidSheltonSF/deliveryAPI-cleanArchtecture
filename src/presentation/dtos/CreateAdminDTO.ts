import { AuthenticationDTO } from './AuthenticationDTO';
import { UserDTO } from './UserDTO';

export interface CreateAdminDTO {
  user: UserDTO;
  authentication: AuthenticationDTO;
}
