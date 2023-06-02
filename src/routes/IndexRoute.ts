import { Router } from "express";
import IndexController from "../controllers/IndexController";

const indexRouter = Router();
const indexController = new IndexController();

indexRouter.get("/", indexController.getHomePage);
indexRouter.get("/signup", indexController.getSignupPage);
indexRouter.post("/signup", (req, res) => indexController.userSignup(req, res));
indexRouter.get("/login", indexController.getLoginPage);
indexRouter.get("/notfound", indexController.getNotFoundPage);
export default indexRouter;
