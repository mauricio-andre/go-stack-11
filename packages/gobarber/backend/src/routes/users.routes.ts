import { Router } from 'express';
import User from '../entities/User';

import CreateUserService from '../services/CreateUserService';

interface UserResponse extends Omit<User, 'password'> {
  password?: string;
}

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    const userResponse = { ...user } as UserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  } catch ({ message }) {
    return response.status(400).json({ error: message });
  }
});

export default usersRouter;
