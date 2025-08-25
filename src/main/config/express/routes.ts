import { Express, Router } from 'express';
import { CustomerRoutes } from '../../routes/CustomerRoutes';
import { AuthenticationRoutes } from '../../routes/AuthenticationRoutes';

export default (app: Express): void => {
  const router = Router();

  CustomerRoutes.configureRoutes(router);
  AuthenticationRoutes.configureRoutes(router)

  app.use('/app', router);
};
