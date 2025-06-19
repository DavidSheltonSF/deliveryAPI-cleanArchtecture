import { SpyUserRepository } from "../spy-user-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyUserRepository', () => {


  test('Should add a new', async () => {

    const spyUserRepository = new SpyUserRepository();

    const [mokedUser] = MockData.mockCustomerDTO();

    await spyUserRepository.add(mokedUser);

    const userInserted = spyUserRepository.addParams.newUser;
    
    expect(userInserted?.username)
      .toBe(mokedUser.username);
    expect(userInserted?.email)
      .toBe(mokedUser.email);
    expect(userInserted?.cpf)
      .toBe(mokedUser.cpf);
    expect(userInserted?.phone)
      .toBe(mokedUser.phone);
    expect(userInserted?.address?.street)
      .toBe(mokedUser.address?.street);
    expect(userInserted?.address?.city)
      .toBe(mokedUser.address?.city);
    expect(userInserted?.address?.state)
      .toBe(mokedUser.address?.state);
    expect(userInserted?.address?.zipCode)
      .toBe(mokedUser.address?.zipCode);
    expect(userInserted?.authentication?.password)
      .toBe(mokedUser.authentication.password);
  });

});