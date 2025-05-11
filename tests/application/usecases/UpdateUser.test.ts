import { SpyUserRepository } from '../_in-memory-repositories/spy-user-repository';
import { UpdateUser } from '../../../src/application/usecases/user/update-user/UpdateUser';
import { MockData } from '../../_helpers/mockData';

describe('Testing UpdateUserUseCase', () => {

  test('Should update a new user', async () => {
    const spyUserRepository = new SpyUserRepository();
    const updateUserUseCase = new UpdateUser(spyUserRepository);

    const mockedUser = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser);

    const updatedData = {...mockedUser };
    updatedData.username = 'updatedUsername';
    updatedData.email = 'updated@email.com';

    const userIdStr = mockedUser._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not a valid string');
    } 

    const response = await updateUserUseCase.execute(userIdStr, updatedData);

    expect(spyUserRepository.updateParams.userId).toBe(userIdStr);
    expect(spyUserRepository.updateParams.user?.username).toBe(updatedData.username);
    expect(spyUserRepository.updateParams.user?.email).toBe(updatedData.email);
    expect(spyUserRepository.updateParams.user?.role).toBe(updatedData.role);
    expect(spyUserRepository.updateParams.user?.phone).toBe(updatedData.phone);
    expect(spyUserRepository.updateParams.user?.cpf).toBe(updatedData.cpf);
    expect(spyUserRepository.updateParams.user?.bankInfo?.paymentInfo).toBe(updatedData.bankInfo?.paymentInfo);
    expect(spyUserRepository.updateParams.user?.bankInfo?.paymentMethod).toBe(updatedData.bankInfo?.paymentMethod);
    expect(spyUserRepository.updateParams.user?.authentication.password).toBe(updatedData.authentication.password);
    expect(spyUserRepository.updateParams.user?.address?.city).toBe(updatedData.address?.city);
    expect(spyUserRepository.updateParams.user?.address?.state).toBe(updatedData.address?.state);
    expect(spyUserRepository.updateParams.user?.address?.street).toBe(updatedData.address?.street);
    expect(spyUserRepository.updateParams.user?.address?.zipCode).toBe(updatedData.address?.zipCode);

  });

  test('Should return DuplicatedDataError when updating email to one already associated to another user', async () => {
    const spyUserRepository = new SpyUserRepository();
    const updateUserUseCase = new UpdateUser(spyUserRepository);

    const mockedUser1 = MockData.mockUser();
    const mockedUser2 = MockData.mockUser();

    spyUserRepository.userDatabase.push(mockedUser1);
    spyUserRepository.userDatabase.push(mockedUser2);

    // Update the email of user2 to the same email as user1
    const updatedUser2 = {...mockedUser2 };
    updatedUser2.username = 'updatedUsername';
    updatedUser2.email = mockedUser1.email;

    const userIdStr = updatedUser2._id?.toString();

    if (!userIdStr) {
      throw new Error('User ID is not a valid string');
    } 

    const response = await updateUserUseCase.execute(userIdStr, updatedUser2);

    expect(response.isLeft()).toBeTruthy();

  });

})