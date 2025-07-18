import { WithId, Document } from 'mongodb';
import { CustomerModel } from '../../../models/mongodb/CustomerModel';

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
