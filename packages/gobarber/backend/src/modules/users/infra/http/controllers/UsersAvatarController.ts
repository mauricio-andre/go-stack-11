import updateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(updateUserAvatarService);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename || '',
    });

    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  }
}
