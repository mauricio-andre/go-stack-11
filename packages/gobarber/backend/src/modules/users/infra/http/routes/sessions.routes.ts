import { Router } from 'express';
import User from '@modules/users/infra/typeorm/entities/User';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UserRepository';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);
  const { user, token } = await authenticateUser.execute({ email, password });
  const userResponse = { ...user } as IUserResponse;

  delete userResponse.password;

  return response.json({ user: userResponse, token });
});

export default sessionsRouter;
