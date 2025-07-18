import { WithId, Document } from 'mongodb';
import { CustomerModel } from '../../../models/mongodb/CustomerModel';
import { stringToObjectId } from '../helpers/stringToObjectId';
import { CustomerUser } from '../../../../domain/entities/user/customer/CustomerUser';

export function persistenceToCustomerModel(
  document: WithId<Document>
): CustomerModel {
  if (document === null) {
    throw Error('No document provided from persistence.');
  }

  return {
    _id: document._id,
    username: document.username,
    name: document.name,
    email: document.email,
    cpf: document.cpf,
    phone: document.phone,
    role: document.role,
    birthday: document.birthday,
    createdAt: document.createdAt,
  };
}

export function entityToCustomerModel(customer: CustomerUser): CustomerModel {
  if (document === null) {
    throw Error('No entity provided.');
  }

  return {
    _id: stringToObjectId(customer.id),
    username: customer.username.get(),
    name: customer.name.get(),
    email: customer.email.get(),
    cpf: customer.cpf.get(),
    phone: customer.phone.get(),
    role: customer.role.get(),
    birthday: customer.birthday.get(),
    createdAt: customer.createdAt,
  };
}