import { SpyUserRepository } from "./spy-user-repository";
import { MockData } from '../../_helpers/mockData'
import { User as UserData } from '../../../src/domain/entities/user'


describe('Testing SpyUserRepository', () => {

  test('Should return all users in the FAKE database', async () => {
  
    const users = [];
    for(let i=0; i<=1; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    const allUsers = await spyUserRepository.findAllUsers();
    
    expect(allUsers[0].username).toEqual(users[0].username);
    expect(allUsers[1].username).toEqual(users[1].username);

  });

  test('Should find a user by id', async () => {

    const users = [];
    for(let i=0; i<=9; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    const foundUser = await spyUserRepository.findUserById(users[5]._id.toString());

    expect(foundUser.username)
      .toBe(users[5].username);
    expect(foundUser.email)
      .toBe(users[5].email);
    expect(foundUser.cpf)
      .toBe(users[5].cpf);
    expect(foundUser.phone)
      .toBe(users[5].phone);
    expect(foundUser.role)
      .toBe(users[5].role);
  });
  
  test('Should find a user by email', async () => {

    const users = [];
    for(let i=0; i<=9; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    const foundUser = await spyUserRepository.findUserByEmail(users[6].email);

    expect(foundUser.username)
      .toBe(users[6].username);
    expect(foundUser.email)
      .toBe(users[6].email);
    expect(foundUser.cpf)
      .toBe(users[6].cpf);
    expect(foundUser.phone)
      .toBe(users[6].phone);
    expect(foundUser.role)
      .toBe(users[6].role);
  });

  test('Should add a new', async () => {

    const users: UserData[] = [];
    for(let i=0; i<=9; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    await spyUserRepository.add(users[7]);

    const userInserted = spyUserRepository.addParams.user;
    
    expect(userInserted.username)
      .toBe(users[7].username);
    expect(userInserted.email)
      .toBe(users[7].email);
    expect(userInserted.cpf)
      .toBe(users[7].cpf);
    expect(userInserted.phone)
      .toBe(users[7].phone);
    expect(userInserted.address.street)
      .toBe(users[7].address.street);
    expect(userInserted.address.city)
      .toBe(users[7].address.city);
      expect(userInserted.address.state)
      .toBe(users[7].address.state);
    expect(userInserted.address.zipCode)
      .toBe(users[7].address.zipCode);
    expect(userInserted.authentication.password)
      .toBe(users[7].authentication.password);
  });


  test('Should update user by id', async () => {

    const users: UserData[] = [];
    for(let i=0; i<=9; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    const updatedData = {
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

    await spyUserRepository.update(users[7]._id.toString(), updatedData);

    const userUpdatedId = spyUserRepository.updateParams.userId
    const updatedUser = spyUserRepository.updateParams.user;

    expect(userUpdatedId.toString())
      .toBe(users[7]._id.toString());
    
    expect(updatedUser.username)
      .toBe(updatedData.username);
    expect(updatedUser.email)
      .toBe(updatedData.email);
    expect(updatedUser.cpf)
      .toBe(updatedData.cpf);
    expect(updatedUser.phone)
      .toBe(updatedData.phone);
    expect(updatedUser.address.street)
      .toBe(updatedData.address.street);
    expect(updatedUser.address.city)
      .toBe(updatedData.address.city);
      expect(updatedUser.address.state)
      .toBe(updatedData.address.state);
    expect(updatedUser.address.zipCode)
      .toBe(updatedData.address.zipCode);
    expect(updatedUser.authentication.password)
      .toBe(updatedData.authentication.password);
  });
  
  test('Should remove user by id', async () => {
    
    const users: UserData[] = [];
    for(let i=0; i<=3; i++) {
      users.push(MockData.mockUser());
    }

    const spyUserRepository = new SpyUserRepository(users);

    await spyUserRepository.remove(users[2]._id.toString());

    const removedUserId = spyUserRepository.removeParams.userId;
    
    expect(removedUserId)
      .toBe(users[2]._id.toString());
  });

});