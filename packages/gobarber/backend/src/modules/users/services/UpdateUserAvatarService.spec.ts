import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('Should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatarService.execute({
        userId: 'non-exists-user',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(user.avatar).toBe('avatar2.png');
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
  });
});
