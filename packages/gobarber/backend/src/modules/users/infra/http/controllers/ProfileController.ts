import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ userId });
    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  }
}
