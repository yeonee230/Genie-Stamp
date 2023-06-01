import express from 'express';
import { rankingEachMonthStamps, rankingTotalStamps } from '../controllers/stampController';
import { protectMiddeleware } from '../middlewares';

const stampRouter = express.Router();

//stampRouter.get("/add", addStamp);
//stampRouter.get("/:id([0-9a-f]{24})/delete", deleteStamp);//도장 삭제
//stampRouter.get("/edit", editStamp);
stampRouter.get('/total-ranking', protectMiddeleware, rankingTotalStamps); // 전체 누적 도장 랭킹
stampRouter.get('/ranking/:month', protectMiddeleware, rankingEachMonthStamps); // 월별 누적 도장 랭킹
//TODO: 월별 도장 통계 보여주는 기능 만들기.
//TODO: 도장별 누적 랭킹 보여주는 기능 만들기
//TODO: 지금까지 전체 누적도장 개수 랭킹 보여주는 기능 만들기.
//TODO: 도장 종류 수정 삭제.
//TODO: 도장 개수 제한 기능 만들기.

export default stampRouter;
