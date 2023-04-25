import express from "express";
import { addStampType, deleteStampType } from "../controllers/stampController";
import { getSetting } from "../controllers/userController";

const settingtRouter = express.Router();

settingtRouter.get("/", getSetting);//학생 및 도장 관리
settingtRouter.post("/stamp/add", addStampType);//도장종류 추가
//settingtRouter.get("/stamp/:id([0-9a-f]{24})/delete", deleteStampType);//도장종류 삭제
// studentRouter.get("/stamp/:id([0-9a-f]{24})/edit", editStamp);

export default settingtRouter;
