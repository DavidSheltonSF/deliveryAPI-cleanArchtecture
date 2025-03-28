import { UserRepository } from "../../../src/application/usecases/ports/user-repository";
import { User as UserData } from "../../../src/domain/entities/user";

export class SpyUserRepository implements UserRepository {
  users: UserData[] = [];
  addParams: Record<string, UserData> = {};
  updateParams: {
    userId?: string,
    user?: Omit<UserData, '_id'>,
  } = {};
  removeParams: {
    userId?: string,
  } = {};

  constructor(users: UserData[]) {
    this.users = users;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users;
  }

  async findUserById(id: string): Promise<UserData | null> {
    let foundUser: UserData | null = null;

    for (let i=0; i<this.users.length; i++) {
      if (this.users[i]._id?.toString() === id){
        foundUser = this.users[i];
      }
    }

    return foundUser;
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    let foundUser: UserData | null = null;

    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].email === email){
        foundUser = this.users[i];
      }
    }

    return foundUser;
  }

  async add(user: UserData): Promise<void> {
    this.addParams.user = user;
  }

  async update(userId: string, user: Omit<UserData, '_id'>): Promise<void> {
    this.updateParams = {
      userId,
      user
    };
  }

  async remove(userId: string): Promise<void> {
    this.removeParams = {userId};
  }

}