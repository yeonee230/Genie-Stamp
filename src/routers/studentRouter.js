import express from "express";
import { getStudents } from "../controllers/userController";

const studentRouter = express.Router();

studentRouter.get("/", getStudents);
// studentRouter.get("/add", addStamp);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);

export default studentRouter;
