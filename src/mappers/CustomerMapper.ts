import { WithId, Document } from 'mongodb';
import { UserModel } from '../infrastructure/models/mongodb/UserModel';
import { stringToObjectId } from '../infrastructure/repositories/mongodb/helpers/stringToObjectId';
import { CustomerUser } from '../domain/entities/CustomerUser';
import { CreateUserDTO } from '../presentation/dtos/CreateUserDTO';
import { UserProps } from '../domain/entities/props/UserProps';
import { UserResponseDTO } from '../application/useCaseDtos/UserResponseDTO';
import { Either } from '../shared/either';
import { Birthday, Cpf, Email, Name, Phone, UserName } from '../domain/value-objects';
import { validateUserProps } from '../domain/helpers/validateUserProps';
import { UserDTO } from '../presentation/dtos/UserDTO';
import { userValidationErrorType } from '../domain/errors/errorTypes';

export class CustomerMapper {
  static rawToProps(
    userData: UserDTO
  ): Either<userValidationErrorType, UserProps> {
    const { username, name, email, cpf, phone, birthday } = userData;
  
    const usernameOrError = UserName.create(username);
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const cpfOrError = Cpf.create(cpf);
    const phoneOrError = Phone.create(phone);
    const birthdayOrError = Birthday.create(birthday);
  
    const validationResult = validateUserProps({
      usernameOrError,
      nameOrError,
      emailOrError,
      cpfOrError,
      phoneOrError,
      birthdayOrError,
    });
  
    if (validationResult.isLeft()) {
      return Either.left(validationResult.getLeft());
    }
  
    const userProps = {
      username: usernameOrError.getRight(),
      name: nameOrError.getRight(),
      email: emailOrError.getRight(),
      cpf: cpfOrError.getRight(),
      phone: phoneOrError.getRight(),
      birthday: birthdayOrError.getRight(),
    };
  
    return Either.right(userProps);
  }

  static modelToResponseDTO(UserModel: UserModel): UserResponseDTO {
    const { _id, username, name, email, phone, role, createdAt } =
      UserModel;

    return {
      id: _id,
      username,
      name,
      email,
      phone,
      role,
      createdAt: createdAt.toISOString().split('T')[0],
    };
  }

  static persistenceToUserModel(document: WithId<Document>): UserModel {
    if (document === null) {
      throw Error('No document provided from persistence.');
    }

    return {
      _id: document._id.toString(),
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

  static entityToUserModel(customer: CustomerUser): UserModel {
    if (customer === null) {
      throw Error('No entity provided.');
    }

    return {
      _id: customer.id,
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
}
