import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class updateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default updateUserAvatarService;
