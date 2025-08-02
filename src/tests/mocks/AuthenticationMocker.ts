import { faker } from '@faker-js/faker';
import { AuthenticationDTO } from '../../presentation/dtos/AuthenticationDTO';

export class AuthenticationMocker {
  static mockAuthenticationDTO(): AuthenticationDTO {
    const lower = faker.string.alpha({ casing: 'lower' });
    const upper = faker.string.alpha({ casing: 'upper' });
    const twoSimbols = faker.string.symbol(2);
    const twoNumbers = faker.string.numeric({ length: 2 });
    const rest = faker.internet.password({ length: 2 });
    const strongPassword = [lower, upper, twoSimbols, twoNumbers, rest].join('');

    const AuthenticationDTO: AuthenticationDTO = {
      password: strongPassword,
      sessionToken: '$sjafiifnaaisbgjndagkoab',
    };

    return AuthenticationDTO;
  }
}
