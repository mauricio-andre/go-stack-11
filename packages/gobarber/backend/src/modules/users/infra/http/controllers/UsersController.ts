import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  }
}
