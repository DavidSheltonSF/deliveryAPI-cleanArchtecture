import { WithId, Document } from 'mongodb';
import { CustomerModel } from '../infrastructure/models/mongodb/CustomerModel';
import { stringToObjectId } from '../infrastructure/repositories/mongodb/helpers/stringToObjectId';
import { CustomerUser } from '../domain/entities/CustomerUser';

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
  if (customer === null) {
    throw Error('No entity provided.');
  }

  return {
    _id: stringToObjectId(customer.id),
    username: customer.username,
    name: customer.name,
    email: customer.email,
    cpf: customer.cpf,
    phone: customer.phone,
    role: customer.role,
    birthday: customer.birthday,
    createdAt: new Date(),
  };
}
