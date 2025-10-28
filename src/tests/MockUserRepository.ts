import { UserRepository } from '../application/ports/UserRepository';
import { UserProps } from '../domain/entities/props/UserProps';
import { WithId } from '../utils/types/WithId';
import { UserMocker } from './mocks/UserMocker';

interface MockRepoReturnConfig {
  findAll?: WithId<UserProps>[];
  findById?: WithId<UserProps> | null;
  findByEmail?: WithId<UserProps> | null;
  create?: WithId<UserProps> | null;
  update?: WithId<UserProps> | null;
  delete?: WithId<UserProps> | null;
}

export class MockUserRepository implements UserRepository {
  constructor(private readonly customReturn: MockRepoReturnConfig = {}) {}

  async findAll(): Promise<WithId<UserProps>[]> {
    const promise: Promise<WithId<UserProps>[]> = new Promise((resolve) => {
      if (!this.customReturn.findAll) {
        const user = UserMocker.mockUserPropsWithId();
        resolve([user]);
      }

      resolve(this.customReturn.findAll);
    });

    return promise;
  }

  async findById(id: string): Promise<WithId<UserProps>> {
    const promise: Promise<WithId<UserProps>> = new Promise((resolve) => {
      if (!this.customReturn.findById) {
        const user = UserMocker.mockUserPropsWithId();
        resolve(user);
      }

      resolve(this.customReturn.findById);
    });

    return promise;
  }

  async findByEmail(email: string): Promise<WithId<UserProps>> {
    const promise: Promise<WithId<UserProps>> = new Promise((resolve) => {
      if (!this.customReturn.findByEmail) {
        const user = UserMocker.mockUserPropsWithId();
        resolve(user);
      }

      resolve(this.customReturn.findByEmail);
    });

    return promise;
  }

  async create(user: UserProps): Promise<WithId<UserProps>> {
    const promise: Promise<WithId<UserProps>> = new Promise((resolve) => {
      if (!this.customReturn.create) {
        const user = UserMocker.mockUserPropsWithId();
        resolve(user);
      }

      resolve(this.customReturn.create);
    });

    return promise;
  }

  async update(id: string): Promise<WithId<UserProps>> {
    const promise: Promise<WithId<UserProps>> = new Promise((resolve) => {
      if (!this.customReturn.update) {
        const user = UserMocker.mockUserPropsWithId();
        resolve(user);
      }

      resolve(this.customReturn.update);
    });

    return promise;
  }

  async delete(id: string): Promise<WithId<UserProps>> {
    const promise: Promise<WithId<UserProps>> = new Promise((resolve) => {
      if (!this.customReturn.delete) {
        const user = UserMocker.mockUserPropsWithId();
        resolve(user);
      }

      resolve(this.customReturn.delete);
    });

    return promise;
  }
}
