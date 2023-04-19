import express from "express";
import { getStudents, postAddStudent } from "../controllers/userController";

const studentRouter = express.Router();

//studentRouter.get("/", getStudents);
studentRouter.post("/add", postAddStudent);
// studentRouter.get("/add", addStamp);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);

export default studentRouter;
