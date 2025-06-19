import { WithId, Document } from 'mongodb';
import { UserProps } from '../../../../domain/entities/user-props';
import { mongoHelper } from './mongo-helper';

export class MongodbMapper {
  static toUser(data: WithId<Document>): UserProps {
    const id = data._id.toString();
    const {
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      bankInfo,
    } = data;

    return {
      id,
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      bankInfo,
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
