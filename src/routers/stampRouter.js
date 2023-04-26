import express from "express";
import { rankingTotalStamps } from "../controllers/stampController";

const stampRouter = express.Router();


//stampRouter.get("/add", addStamp);
//stampRouter.get("/:id([0-9a-f]{24})/delete", deleteStamp);//도장 삭제
//stampRouter.get("/edit", editStamp);
stampRouter.get("/total-ranking", rankingTotalStamps);// 누적 도장 랭킹



export default stampRouter;