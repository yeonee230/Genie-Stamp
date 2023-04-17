import express from "express";
import { home } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
// rootRouter.get("/login", getLogin);
// rootRouter.get("/join", getJoin);
// rootRouter.get("/logout", logout);

export default rootRouter;
