import { Router } from 'express';
import multer from 'multer';
import User from '../entities/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import UpdateUserAvatarService from '../services/updateUserAvatarService';

interface UserResponse extends Omit<User, 'password'> {
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file?.filename,
      });

      const userResponse = { ...user } as UserResponse;

      delete userResponse.password;

      return response.json(userResponse);
    } catch ({ message }) {
      return response.status(400).json({ error: message });
    }
  },
);

export default usersRouter;
