import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({ email, password });
    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json({ user: userResponse, token });
  }
}
