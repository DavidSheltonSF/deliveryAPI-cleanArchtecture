import  {UserProps} from "../../../../../domain/entities/user-props";
import { WithId, Document } from "mongodb";
import { mongoHelper } from "../mongo-helper";

export class UserMapper {
  /* Converts database documents into User type objects */
  static toUser (data: WithId<Document>): UserProps {

    const _id = data._id.toString()
    const {
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
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
      bankInfo
    }
  }

  static toUserDocument (data: UserProps): WithId<Document>{
    const _id = mongoHelper.toObjectId(data._id);
    const {
        username,
        email,
        cpf,
        phone,
        role,
        address,
        authentication,
        bankInfo
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
      bankInfo
    }
  }
}