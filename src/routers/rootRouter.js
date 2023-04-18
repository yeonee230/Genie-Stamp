import express from "express";
import { getBoard, getStats } from "../controllers/stampController";
import { home, getLogin, postLogin, getJoin, postJoin, getLogin2 } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/login2", getLogin2);
rootRouter.get("/stats", getStats);
rootRouter.route("/join").get(getJoin).post(postJoin);
// rootRouter.get("/logout", logout);

export default rootRouter;
