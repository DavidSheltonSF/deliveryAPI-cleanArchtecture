import { CustomerRepository } from '../application/ports/CustomerRepository';
import { CustomerProps } from '../domain/entities/props/CustomerProps';
import { WithId } from '../utils/types/WithId';
import { CustomerMocker } from './mocks/CustomerMocker';

interface MockRepoReturnConfig {
  findAll?: WithId<CustomerProps>[];
  findById?: WithId<CustomerProps> | null;
  findByEmail?: WithId<CustomerProps> | null;
  create?: WithId<CustomerProps> | null;
  update?: WithId<CustomerProps> | null;
  delete?: WithId<CustomerProps> | null;
}

export class MockCustomerRepository implements CustomerRepository {
  constructor(private readonly customReturn: MockRepoReturnConfig = {}) {}

  async findAll(): Promise<WithId<CustomerProps>[]> {
    const promise: Promise<WithId<CustomerProps>[]> = new Promise((resolve) => {
      if (!this.customReturn.findAll) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve([customer]);
      }

      resolve(this.customReturn.findAll);
    });

    return promise;
  }

  async findById(id: string): Promise<WithId<CustomerProps>> {
    const promise: Promise<WithId<CustomerProps>> = new Promise((resolve) => {
      if (!this.customReturn.findById) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve(customer);
      }

      resolve(this.customReturn.findById);
    });

    return promise;
  }

  async findByEmail(email: string): Promise<WithId<CustomerProps>> {
    const promise: Promise<WithId<CustomerProps>> = new Promise((resolve) => {
      if (!this.customReturn.findByEmail) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve(customer);
      }

      resolve(this.customReturn.findByEmail);
    });

    return promise;
  }

  async create(customer: CustomerProps): Promise<WithId<CustomerProps>> {
    const promise: Promise<WithId<CustomerProps>> = new Promise((resolve) => {
      if (!this.customReturn.create) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve(customer);
      }

      resolve(this.customReturn.create);
    });

    return promise;
  }

  async update(id: string): Promise<WithId<CustomerProps>> {
    const promise: Promise<WithId<CustomerProps>> = new Promise((resolve) => {
      if (!this.customReturn.update) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve(customer);
      }

      resolve(this.customReturn.update);
    });

    return promise;
  }

  async delete(id: string): Promise<WithId<CustomerProps>> {
    const promise: Promise<WithId<CustomerProps>> = new Promise((resolve) => {
      if (!this.customReturn.delete) {
        const customer = CustomerMocker.mockCustomerPropsWithId();
        resolve(customer);
      }

      resolve(this.customReturn.delete);
    });

    return promise;
  }
}
