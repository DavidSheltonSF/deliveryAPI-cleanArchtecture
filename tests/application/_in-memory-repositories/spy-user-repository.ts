import { UserRepository } from "../../../src/application/usecases/ports/user-repository";
import { UserProps } from "../../../src/domain/entities/user";
import { MockData } from "../../_helpers/mockData";

export class SpyUserRepository implements UserRepository {
  users: UserProps[] = [];
  addParams: {
    user?: UserProps
  } = {};
  findUserByIdParams: {
    id?: string,
  } = {};
  findUserByEmailParams: {
    email?: string,
  } = {};
  updateParams: {
    userId?: string,
    user?: Omit<UserProps, '_id'>,
  } = {};
  removeParams: {
    userId?: string,
  } = {};


  async findAllUsers(): Promise<UserProps[]> {
    return [MockData.mockUser()];
  }

  async findUserById(id: string): Promise<UserProps | null> {
    this.findUserByIdParams = {id};
    return MockData.mockUser();
  }

  async findUserByEmail(email: string): Promise<UserProps | null> {
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

  async add(user: UserProps): Promise<void> {
    console.log('Spy added')
    this.addParams.user = user;
  }

  async update(userId: string, user: Omit<UserProps, '_id'>): Promise<void> {
    this.updateParams = {
      userId,
      user
    };
  }

  async remove(userId: string): Promise<void> {
    this.removeParams = {userId};
  }

}