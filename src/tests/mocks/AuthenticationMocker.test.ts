import {AuthenticationMocker} from './AuthenticationMocker';
import {Password} from '../../domain/value-objects/Password'
import { makeMockHasher } from './mockHasher';


describe('Testing AuthenticationMocker', () => {
  const hasher = makeMockHasher()

  test('Should create a valid password', async () => {
    const auth = AuthenticationMocker.mockAuthenticationDTO();
    const passwordOrError = await Password.create(auth.password, hasher)
    expect(passwordOrError.isRight()).toBeTruthy()
  })
})