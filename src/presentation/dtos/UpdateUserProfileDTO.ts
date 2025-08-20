import { UserDTO } from "./UserDTO";

export type UpdateUserProfileDTO = Partial<Omit<UserDTO, 'password' | 'email' | 'role'> >