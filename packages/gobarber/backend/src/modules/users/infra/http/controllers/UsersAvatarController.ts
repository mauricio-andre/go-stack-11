import updateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(updateUserAvatarService);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename || '',
    });

    return response.json(classToClass(user));
  }
}
