import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'john Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  // it('Should not be able to create a new user with same email from another', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createUser = new CreateUserService(fakeUsersRepository);

  //   await createUser.execute({
  //     name: 'john Doe',
  //     email: 'johnDoe@example.com.br',
  //     password: '123456',
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'john Doe',
  //       email: 'johnDoe@example.com.br',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
