import express from "express";
import {
  getStudents,
  postAddStudent,
  updateStampValue,
} from "../controllers/userController";

const studentRouter = express.Router();

//studentRouter.get("/", getStudents);
studentRouter.post("/add", postAddStudent); //학생추가
// studentRouter.get("/add", addStamp);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);
studentRouter.post("/:id([0-9a-f]{24})/update", updateStampValue); //학생 개별 도장 개수 업데이트

export default studentRouter;
