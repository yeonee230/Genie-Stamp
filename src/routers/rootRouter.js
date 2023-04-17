import express from "express";
import { getBoard, getStats } from "../controllers/stampController";
import { home, getLogin, getJoin, getLogin2 } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/board", getBoard);
rootRouter.get("/login", getLogin);
rootRouter.get("/login2", getLogin2);
rootRouter.get("/stats", getStats);
rootRouter.get("/join", getJoin);
// rootRouter.get("/logout", logout);

export default rootRouter;
