import express from "express";
import { addStampType, deleteStampType } from "../controllers/stampController";
import { getSetting } from "../controllers/userController";

const settingtRouter = express.Router();

settingtRouter.get("/", getSetting);
settingtRouter.post("/stamp/add", addStampType);
settingtRouter.get("/stamp/:id([0-9a-f]{24})/delete", deleteStampType);
// studentRouter.get("/delete", deleteStamp);
// studentRouter.get("/edit", editStamp);

export default settingtRouter;
