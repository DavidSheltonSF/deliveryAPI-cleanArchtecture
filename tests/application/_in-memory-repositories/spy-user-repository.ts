import { UserRepository } from "../../../src/application/usecases/ports/user-repository";
import { User as UserData } from "../../../src/domain/entities/user";
import { MockData } from "../../_helpers/mockData";

export class SpyUserRepository implements UserRepository {
  users: UserData[] = [];
  addParams: {
    user?: UserData
  } = {};
  findUserByIdParams: {
    id?: string,
  } = {};
  findUserByEmailParams: {
    email?: string,
  } = {};
  updateParams: {
    userId?: string,
    user?: Omit<UserData, '_id'>,
  } = {};
  removeParams: {
    userId?: string,
  } = {};


  async findAllUsers(): Promise<UserData[]> {
    return [MockData.mockUser()];
  }

  async findUserById(id: string): Promise<UserData | null> {
    this.findUserByIdParams = {id};
    return MockData.mockUser();
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    this.findUserByEmailParams = {email};
    return MockData.mockUser();
  }

  async exists(email: string): Promise<boolean>{
    for (let i=0; i<this.users.length; i++){
      if (this.users[i].email == email){
        return true;
      }
    }

    return false
  }

  async add(user: UserData): Promise<void> {
    console.log('Spy added')
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