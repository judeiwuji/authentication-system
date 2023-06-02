import { Router } from 'express';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureVerified from '../middlewares/ensureVerified';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/dashboard', ensureAuthenticated, ensureVerified, (req, res) =>
  userController.getDashboard(req, res)
);
userRouter.get(
  '/profile',
  ensureAuthenticated,
  ensureVerified,
  userController.getProfilePage
);
userRouter.put('/profile', (req, res) =>
  userController.updateProfile(req, res)
);
userRouter.post(
  '/updateSecret',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => userController.updateSecret(req, res)
);
userRouter.delete(
  '/users/apps/:id',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => userController.deleteApp(req, res)
);
userRouter.delete(
  '/users/devices/:id',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => userController.deleteDevice(req, res)
);
userRouter.get('/users/public/profile', (req, res) =>
  userController.getPublicProfile(req, res)
);
export default userRouter;
