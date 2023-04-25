import express from "express";
import { getBoard, getStats } from "../controllers/stampController";
import { home, getLogin, postLogin, getJoin, postJoin, getLogin2, logout, postLogin2, studentMain } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);//홈
rootRouter.route("/login").get(getLogin).post(postLogin);//교사로그인
rootRouter.route("/login2").get(getLogin2).post(postLogin2);//학생로그인
rootRouter.get("/stats", getStats); //통계
rootRouter.route("/join").get(getJoin).post(postJoin);//교사 회원가입
rootRouter.get("/logout", logout); //로그아웃
rootRouter.get("/board", getBoard); //칭찬도장판
rootRouter.get("/student-main", studentMain);//학생 메인


export default rootRouter;
