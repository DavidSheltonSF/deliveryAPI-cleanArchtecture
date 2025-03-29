import { SpyUserRepository } from "../spy-user-repository";
import { MockData } from '../../../_helpers/mockData'
import { User as UserData } from '../../../../src/domain/entities/user'


describe('Testing SpyUserRepository', () => {

  test('Should return all users in the FAKE database', async () => {

    const spyUserRepository = new SpyUserRepository();

    const allUsers = await spyUserRepository.findAllUsers();
    
    expect(allUsers).toBeTruthy();
  });

  test('Should find a user by id', async () => {

    const spyUserRepository = new SpyUserRepository();

    const userId = "123456789012345678901234"

    const foundUser = await spyUserRepository.findUserById(userId);
    
    expect(spyUserRepository.findUserByIdParams.id).toEqual(userId);
    expect(foundUser).toBeTruthy();
  });
  
  test('Should find a user by email', async () => {

    const spyUserRepository = new SpyUserRepository();

    const userEmail = "test@bugmail.com"

    const foundUser = await spyUserRepository.findUserByEmail(userEmail);
    
    expect(spyUserRepository.findUserByEmailParams.email).toEqual(userEmail);
    expect(foundUser).toBeTruthy();
  });

  test('Should add a new', async () => {

    const spyUserRepository = new SpyUserRepository();

    const fakeUser = MockData.mockUser();

    await spyUserRepository.add(fakeUser);

    const userInserted = spyUserRepository.addParams.user;
    
    expect(userInserted.username)
      .toBe(fakeUser.username);
    expect(userInserted.email)
      .toBe(fakeUser.email);
    expect(userInserted.cpf)
      .toBe(fakeUser.cpf);
    expect(userInserted.phone)
      .toBe(fakeUser.phone);
    expect(userInserted.address.street)
      .toBe(fakeUser.address.street);
    expect(userInserted.address.city)
      .toBe(fakeUser.address.city);
      expect(userInserted.address.state)
      .toBe(fakeUser.address.state);
    expect(userInserted.address.zipCode)
      .toBe(fakeUser.address.zipCode);
    expect(userInserted.authentication.password)
      .toBe(fakeUser.authentication.password);
  });


  test('Should update user by id', async () => {

    const spyUserRepository = new SpyUserRepository();

    const updatedData = {
      _id: null,
      username: 'username-updated',
      email: 'email@bugmail.com-updated',
      cpf: '88888888888-updated',
      phone: '21555777777-updated',
      role: 'admin-updated',
      address: {
        street: 'test streed-updated',
        city: 'Belford Roxo-updated',
        state: 'Rio de Janeiro-updated',
        zipCode: '22222220-updated'
      },
      authentication: {
        password: 'lOk*#gnOs15'
      },
    }

    const fakeUserId = MockData.generateHexId();

    await spyUserRepository.update(fakeUserId, updatedData);

    const userUpdatedId = spyUserRepository.updateParams.userId
    const updatedUser = spyUserRepository.updateParams.user;

    expect(userUpdatedId?.toString())
      .toBe(fakeUserId);
    
    expect(updatedUser?.username)
      .toBe(updatedData.username);
    expect(updatedUser?.email)
      .toBe(updatedData.email);
    expect(updatedUser?.cpf)
      .toBe(updatedData.cpf);
    expect(updatedUser?.phone)
      .toBe(updatedData.phone);
    expect(updatedUser?.address.street)
      .toBe(updatedData.address.street);
    expect(updatedUser?.address.city)
      .toBe(updatedData.address.city);
      expect(updatedUser?.address.state)
      .toBe(updatedData.address.state);
    expect(updatedUser?.address.zipCode)
      .toBe(updatedData.address.zipCode);
    expect(updatedUser?.authentication.password)
      .toBe(updatedData.authentication.password);
  });
  
  test('Should remove user by id', async () => {

    const spyUserRepository = new SpyUserRepository();

    const fakeUserId = MockData.generateHexId();

    await spyUserRepository.remove(fakeUserId);

    const removedUserId = spyUserRepository.removeParams.userId;
    
    expect(removedUserId)
      .toBe(fakeUserId);
  });

});