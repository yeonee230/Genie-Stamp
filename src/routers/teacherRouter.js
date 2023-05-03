import express from "express";
import { protectMiddeleware } from "../middlewares";

const teacherRouter = express.Router();

teacherRouter.get("/logout", protectMiddeleware,logout);

export default teacherRouter;