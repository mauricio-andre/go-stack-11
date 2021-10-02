import User from '@modules/users/infra/typeorm/entities/User';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';
import { container } from 'tsyringe';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUser.execute({ email, password });
  const userResponse = { ...user } as IUserResponse;

  delete userResponse.password;

  return response.json({ user: userResponse, token });
});

export default sessionsRouter;
