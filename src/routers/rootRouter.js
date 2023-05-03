import express from "express";
import { getBoard, getStats } from "../controllers/stampController";
import { home, getLogin, postLogin, getJoin, postJoin, getLogin2, logout, postLogin2, studentMain } from "../controllers/userController";
import { protectMiddeleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);//홈
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);//교사로그인
rootRouter.route("/login2").all(publicOnlyMiddleware).get(getLogin2).post(postLogin2);//학생로그인
rootRouter.get("/stats", protectMiddeleware, getStats); //통계
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);//교사 회원가입
rootRouter.get("/logout", protectMiddeleware, logout); //로그아웃
rootRouter.get("/board", protectMiddeleware,getBoard); //칭찬도장판
rootRouter.get("/student-main",protectMiddeleware, studentMain);//학생 메인


export default rootRouter;
