import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to list providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'john Trê',
      email: 'johntre@example.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'john Qua',
      email: 'johnqua@example.com.br',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});
