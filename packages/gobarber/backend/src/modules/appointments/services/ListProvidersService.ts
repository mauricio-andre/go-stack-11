import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      exceptUserId: userId,
    });

    return users;
  }
}

export default ListProvidersService;
