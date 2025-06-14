import { UserRepository } from "../../../src/application/_ports/user-repository";
import { UserProps } from "../../../src/domain/entities/user-props";
import { MockData } from "../../_helpers/mockData";

export class SpyUserRepository implements UserRepository {
  userDatabase: UserProps[] = [];
  addParams: {
    newUser?: UserProps;
  } = {};
  findUserByIdParams: {
    id?: string;
  } = {};
  findUserByEmailParams: {
    email?: string;
  } = {};
  updateParams: {
    userId?: string;
    userData?: Partial<Omit<UserProps, 'id'>>;
  } = {};
  removeParams: {
    userId?: string;
  } = {};

  async findAllUsers(): Promise<UserProps[]> {
    return this.userDatabase;
  }

  async findUserById(id: string): Promise<UserProps | null> {
    this.findUserByIdParams = { id };
    for (let i = 0; i < this.userDatabase.length; i++) {
      if (this.userDatabase[i].id?.toString() == id) {
        return this.userDatabase[i];
      }
    }
    return null;
  }

  async findUserByEmail(email: string): Promise<UserProps | null> {
    this.findUserByEmailParams = { email };
    for (let i = 0; i < this.userDatabase.length; i++) {
      if (this.userDatabase[i].email == email) {
        return this.userDatabase[i];
      }
    }
    return null;
  }

  async exists(email: string): Promise<boolean> {
    for (let i = 0; i < this.userDatabase.length; i++) {
      if (this.userDatabase[i].email == email) {
        return true;
      }
    }

    return false;
  }

  async add(newUser: Omit<UserProps, 'id'>): Promise<UserProps> {
    this.addParams = { newUser };

    const fakeRegistredUser = {
      id: MockData.generateHexId(),
      ...newUser,
    };

    return fakeRegistredUser;
  }

  async update(
    userId: string,
    userData: Partial<Omit<UserProps, 'id'>>
  ): Promise<void> {
    this.updateParams = {
      userId,
      userData,
    };
  }

  async remove(userId: string): Promise<void> {
    this.removeParams = { userId };
  }
}