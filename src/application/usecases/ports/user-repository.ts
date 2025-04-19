import {User as UserData} from '../../../domain/entities/userProps';

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData | null>
  findUserById: (userId: string) => Promise<UserData | null>
  exists: (email: string) => Promise<boolean>
  add: (user: UserData) => Promise<void>
  remove: (userId: string) => Promise<void>
  update: (userId: string, userData: Omit<UserData, '_id'>) => Promise<void>
}