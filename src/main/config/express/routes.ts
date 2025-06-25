import { Express, Router } from 'express';
import { CustomerRoutes } from '../../routes/CustomerRoutes';

export default (app: Express): void => {
  const router = Router();

  CustomerRoutes.configureRoutes(router);

  app.use('/app', router);
};
