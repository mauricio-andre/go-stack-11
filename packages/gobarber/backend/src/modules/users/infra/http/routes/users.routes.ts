import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

interface UserResponse extends Omit<User, 'password'> {
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  const userResponse = { ...user } as UserResponse;

  delete userResponse.password;

  return response.json(userResponse);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    const userResponse = { ...user } as UserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  },
);

export default usersRouter;
