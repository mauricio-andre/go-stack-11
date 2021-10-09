import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index,
);

providersRouter.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
