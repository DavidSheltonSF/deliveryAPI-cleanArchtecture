import { faker } from '@faker-js/faker';
import { UserDTO } from '../../presentation/dtos/UserDTO';
import { Role } from '../../domain/_enums';

export class UserMocker {
  static mockUserDTO(): UserDTO {
    const userDTO: UserDTO = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cpf: '14485874755',
      phone: '21547855887',
      birthday: '2000-01-02',
      role: faker.helpers.enumValue(Role),
    };
  
    return userDTO;
  }
}
