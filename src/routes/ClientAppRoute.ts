import { Router } from 'express';
import ClientAppController from '../controllers/ClientAppController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureVerified from '../middlewares/ensureVerified';

const clientAppRoute = Router();
const clientAppController = new ClientAppController();

clientAppRoute.post('/apps', ensureAuthenticated, ensureVerified, (req, res) =>
  clientAppController.createApp(req, res)
);

clientAppRoute.get('/apps', ensureAuthenticated, ensureVerified, (req, res) =>
  clientAppController.getApps(req, res)
);

clientAppRoute.get(
  '/apps/:id',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => clientAppController.getApp(req, res)
);

clientAppRoute.put(
  '/apps/:id',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => clientAppController.updateApp(req, res)
);

clientAppRoute.delete(
  '/apps/:id',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => clientAppController.deleteApp(req, res)
);

export default clientAppRoute;
