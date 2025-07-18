import { Address } from '../../address/Address';
import { User } from '../User';
import { CustomerProps } from './CustomerProps';

export class CustomerUser extends User {
  private _address: Address;
  constructor(customerData: CustomerProps) {
    super({
      id: customerData.id,
      username: customerData.username,
      name: customerData.name,
      email: customerData.email,
      cpf: customerData.cpf,
      phone: customerData.phone,
      role: customerData.role,
      birthday: customerData.birthday,
      authentication: customerData.authentication,
    });
    this._address = customerData.address;
  }

  get address(): Address {
    return this._address;
  }
}
