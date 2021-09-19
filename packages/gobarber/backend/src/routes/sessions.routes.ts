import { Router } from 'express';
import User from '../entities/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

interface UserResponse extends Omit<User, 'password'> {
  password?: string;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  const userResponse = { ...user } as UserResponse;

  delete userResponse.password;

  return response.json({ user: userResponse, token });
});

export default sessionsRouter;
