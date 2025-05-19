import { SpyUserRepository } from "../spy-user-repository";
import { MockData } from '../../../_helpers/mockData'


describe('Testing SpyUserRepository', () => {

  test('Should return all users in the FAKE database', async () => {

    const spyUserRepository = new SpyUserRepository();

    const allUsers = await spyUserRepository.findAllUsers();
    
    expect(allUsers).toBeTruthy();
  });

  test('Should find a user by id', async () => {

    const spyUserRepository = new SpyUserRepository();

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const userIdStr = mockedUser._id?.toString();

    if(!userIdStr){
      throw Error('User id is undefined');
    }

    const foundUser = await spyUserRepository.findUserById(userIdStr);
    
    expect(spyUserRepository.findUserByIdParams.id).toEqual(userIdStr);
    expect(foundUser?._id).toBe(mockedUser._id);
  });
  
  test('Should find a user by email', async () => {

    const spyUserRepository = new SpyUserRepository();

    const [mockedUser] = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const foundUser = await spyUserRepository.findUserByEmail(mockedUser.email);
    
    expect(spyUserRepository.findUserByEmailParams.email).toEqual(mockedUser.email);
    expect(foundUser?.email).toBe(mockedUser.email);
  });

  test('Should add a new', async () => {

    const spyUserRepository = new SpyUserRepository();

    const [mokedUser] = MockData.mockUser();

    await spyUserRepository.add(mokedUser);

    const userInserted = spyUserRepository.addParams.user;
    
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
    const updatedUser = spyUserRepository.updateParams.userData;

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
    expect(updatedUser?.address?.street)
      .toBe(updatedData.address.street);
    expect(updatedUser?.address?.city)
      .toBe(updatedData.address.city);
      expect(updatedUser?.address?.state)
      .toBe(updatedData.address.state);
    expect(updatedUser?.address?.zipCode)
      .toBe(updatedData.address.zipCode);
    expect(updatedUser?.authentication?.password)
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