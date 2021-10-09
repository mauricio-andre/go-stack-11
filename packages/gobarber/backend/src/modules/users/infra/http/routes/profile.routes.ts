import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      oldPassword: Joi.string(),
      // oldPassword: Joi.string().when('password', {
      //   is: (password: string) => !!password,
      //   then: Joi.required(),
      // }),
    },
  }),
  profileController.create,
);

export default profileRouter;
