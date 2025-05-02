import { UserRepository } from "../../../src/application/usecases/ports/user-repository";
import { UserProps } from "../../../src/domain/entities/userProps";

export class SpyUserRepository implements UserRepository {
  userDatabase: UserProps[] = [];
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
    return this.userDatabase;
  }

  async findUserById(id: string): Promise<UserProps | null> {
    this.findUserByIdParams = { id };
    for (let i=0; i<this.userDatabase.length; i++){
      if (this.userDatabase[i]._id?.toString() == id){
        return this.userDatabase[i];
      }
    }
    return null;
  }

  async findUserByEmail(email: string): Promise<UserProps | null> {
    this.findUserByEmailParams = { email };
    for (let i=0; i<this.userDatabase.length; i++){
      if (this.userDatabase[i].email == email){
        return this.userDatabase[i];
      }
    }
    return null;
  }

  async exists(email: string): Promise<boolean>{
    for (let i=0; i<this.userDatabase.length; i++){
      if (this.userDatabase[i].email == email){
        return true;
      }
    }

    return false
  }

  async add(user: UserProps): Promise<void> {
    this.addParams = { user };
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