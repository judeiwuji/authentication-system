import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureVerified from '../middlewares/ensureVerified';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/changePassword',
  ensureAuthenticated,
  ensureVerified,
  (req, res) => authController.changePassword(req, res)
);

authRouter.post('/logout', (req, res) => authController.logout(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.get('/login/auth/identity/challenge', (req, res) =>
  authController.getIdentityChallengePage(req, res)
);
authRouter.post('/login/auth/identity/challenge', (req, res) =>
  authController.processIdentityChallenge(req, res)
);
authRouter.get('/login/auth/consent', (req, res) =>
  authController.getUserAppConsentPage(req, res)
);
authRouter.post('/login/auth/consent', (req, res) =>
  authController.processUserAppConsent(req, res)
);

authRouter.get('/login/auth/recoverAccount/identity', (req, res) =>
  authController.getRecoverAccountIdentityPage(req, res)
);

authRouter.post('/login/auth/recoverAccount/identity', (req, res) =>
  authController.recoverAccountIdentity(req, res)
);

authRouter.get('/login/auth/recoverAccount/challenge', (req, res) =>
  authController.getRecoverAccountChallengePage(req, res)
);

authRouter.post('/login/auth/recoverAccount/challenge', (req, res) =>
  authController.recoverAccountChallenge(req, res)
);

authRouter.get('/auth/resetPassword', (req, res) =>
  authController.getResetPasswordPage(req, res)
);

authRouter.post('/auth/resetPassword', (req, res) =>
  authController.resetPassword(req, res)
);
export default authRouter;
