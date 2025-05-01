import { UserProps } from '../../../domain/entities/userProps';

export interface UserRepository {
  findAllUsers: () => Promise<UserProps[]>
  findUserByEmail: (email: string) => Promise<UserProps | null>
  findUserById: (userId: string) => Promise<UserProps | null>
  exists: (email: string) => Promise<boolean>
  add: (user: UserProps) => Promise<void>
  remove: (userId: string) => Promise<void>
  update: (userId: string, userData: Omit<UserProps, '_id'>) => Promise<void>
}