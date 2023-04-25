import express from "express";
import {
  delStudent,
  getStudents,
  postAddStudent,
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

export default studentRouter;
