import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const cacheKey = `providers-list:${userId}`;
    let users = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!users) {
      users = await this.userRepository.findAllProviders({
        exceptUserId: userId,
      });
    }

    await this.cacheProvider.save<User[]>(cacheKey, users);

    return users;
  }
}

export default ListProvidersService;
