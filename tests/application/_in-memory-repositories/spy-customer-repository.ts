import { CustomerRepository } from "../../../src/application/_ports/customer-repository";
import { CustomerProps } from "../../../src/domain/entities/customer-props";
import { MockData } from "../../_helpers/mockData";

export class SpyCustomerRepository implements CustomerRepository {
  customerDatabase: CustomerProps[] = [];
  addParams: {
    newCustomer?: CustomerProps;
  } = {};
  findCustomerByIdParams: {
    id?: string;
  } = {};
  findCustomerByEmailParams: {
    email?: string;
  } = {};
  updateParams: {
    customerId?: string;
    customerData?: Partial<Omit<CustomerProps, 'id'>>;
  } = {};
  removeParams: {
    customerId?: string;
  } = {};

  async findAllCustomers(): Promise<CustomerProps[]> {
    return this.customerDatabase;
  }

  async findCustomerById(id: string): Promise<CustomerProps | null> {
    this.findCustomerByIdParams = { id };
    for (let i = 0; i < this.customerDatabase.length; i++) {
      if (this.customerDatabase[i].id?.toString() == id) {
        return this.customerDatabase[i];
      }
    }
    return null;
  }

  async findCustomerByEmail(email: string): Promise<CustomerProps | null> {
    this.findCustomerByEmailParams = { email };
    for (let i = 0; i < this.customerDatabase.length; i++) {
      if (this.customerDatabase[i].email == email) {
        return this.customerDatabase[i];
      }
    }
    return null;
  }

  async exists(email: string): Promise<boolean> {
    for (let i = 0; i < this.customerDatabase.length; i++) {
      if (this.customerDatabase[i].email == email) {
        return true;
      }
    }

    return false;
  }

  async add(newCustomer: Omit<CustomerProps, 'id'>): Promise<CustomerProps> {
    this.addParams = { newCustomer };

    const fakeRegistredCustomer = {
      id: MockData.generateHexId(),
      ...newCustomer,
    };

    return fakeRegistredCustomer;
  }

  async update(
    customerId: string,
    customerData: Partial<Omit<CustomerProps, 'id'>>
  ): Promise<void> {
    this.updateParams = {
      customerId,
      customerData,
    };
  }

  async remove(customerId: string): Promise<void> {
    this.removeParams = { customerId };
  }
}