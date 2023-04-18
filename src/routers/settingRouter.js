import express from "express";
import { getSetting } from "../controllers/userController";

const settingtRouter = express.Router();

settingtRouter.get("/", getSetting);
// studentRouter.get("/add", addStamp);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);

export default settingtRouter;
