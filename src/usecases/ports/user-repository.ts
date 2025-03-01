import {User as UserData} from '../../entities/user';

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData>
  add: (user: UserData) => Promise<void>
  remove: (userId: string) => Promise<void>
  update: (userId: string, userData: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}