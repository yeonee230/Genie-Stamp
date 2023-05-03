import express from "express";
import {
  delStudent,
  getPwChange,
  getStudents,
  postAddStudent,
  postPwChange,
  resetPW,
  updateStampValue,
  updateStampValue2,
} from "../controllers/userController";
import { protectMiddeleware } from "../middlewares";

const studentRouter = express.Router();

studentRouter.post("/add", protectMiddeleware, postAddStudent); //학생추가
studentRouter.get("/:id([0-9a-f]{24})/delete", protectMiddeleware, delStudent);//학생 삭제
studentRouter.post("/:id([0-9a-f]{24})/update",protectMiddeleware, updateStampValue2); //학생 개별 도장 개수 업데이트
studentRouter.route("/password-change").all(protectMiddeleware).get(getPwChange).post(postPwChange); //학생 비밀번호 변경
studentRouter.get("/:id([0-9a-f]{24})/reset-password", protectMiddeleware, resetPW);//학생비밀번호 리셋

export default studentRouter;
