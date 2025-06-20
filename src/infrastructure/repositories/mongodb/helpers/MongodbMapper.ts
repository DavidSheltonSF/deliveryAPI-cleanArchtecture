import { WithId, Document } from 'mongodb';
import { mongoHelper } from './mongo-helper';
import { CustomerModel } from '../../../models/customer-model';

export class MongodbMapper {
  static fromCustomerDbToModel(data: WithId<Document>): CustomerModel {

    if(data === null){
      return null;
    }

    const _id = data?._id;
    const {
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      createdAt
    } = data;

    return {
      _id,
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      createdAt,
    };
  }

  static toMongodbDocument(data: any): WithId<Document> {
    const {id, ...dataWithoutId} = data
    const _id = mongoHelper.toObjectId(id);

    return {
      _id,
      ...dataWithoutId
    }
  }
}
