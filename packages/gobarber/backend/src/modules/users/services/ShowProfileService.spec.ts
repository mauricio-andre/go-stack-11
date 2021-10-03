import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('john Doe');
    expect(profile.email).toBe('johnDoe@example.com.br');
  });

  it('Should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
