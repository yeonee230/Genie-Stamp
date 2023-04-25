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

const studentRouter = express.Router();

//studentRouter.get("/", getStudents);
studentRouter.post("/add", postAddStudent); //학생추가
// studentRouter.get("/add", addStamp);
studentRouter.get("/:id([0-9a-f]{24})/delete", delStudent);//학생 삭제
// studentRouter.get("/edit", editStamp);
studentRouter.post("/:id([0-9a-f]{24})/update", updateStampValue2); //학생 개별 도장 개수 업데이트
studentRouter.route("/password-change").get(getPwChange).post(postPwChange); //학생 개별 도장 개수 업데이트
studentRouter.get("/:id([0-9a-f]{24})/reset-password", resetPW);//학생비밀번호 리셋

export default studentRouter;
