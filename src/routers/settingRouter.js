import express from "express";
import { addStampType } from "../controllers/stampController";
import { getSetting } from "../controllers/userController";

const settingtRouter = express.Router();

settingtRouter.get("/", getSetting);
settingtRouter.post("/stamp/add", addStampType);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);

export default settingtRouter;
