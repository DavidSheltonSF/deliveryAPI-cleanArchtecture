import { UserProps } from '../../domain/entities/user-props';

export interface UserRepository {
  findAllUsers: () => Promise<UserProps[]>;
  findUserById: (userId: string) => Promise<UserProps | null>;
  findUserByEmail: (email: string) => Promise<UserProps | null>;
  add: (user: Omit<UserProps, "_id">) => Promise<void>;
  remove: (userId: string) => Promise<void>;
  update: (userId: string, userData: Partial<UserProps>) => Promise<void>;
}