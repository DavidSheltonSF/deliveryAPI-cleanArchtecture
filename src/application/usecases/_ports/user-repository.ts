import { UserProps } from '../../../domain/entities/user-props';

export interface UserRepository {
  findAllUsers: () => Promise<UserProps[]>;
  findUserById: (userId: string) => Promise<UserProps | null>;
  add: (user: UserProps) => Promise<void>;
  remove: (userId: string) => Promise<void>;
  update: (userId: string, userData: Omit<UserProps, '_id'>) => Promise<void>;
}