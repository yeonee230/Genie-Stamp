import express from "express";

const stampRouter = express.Router();


stampRouter.get("/add", addStamp);
stampRouter.get("/delete", deleteStamp);
stampRouter.get("/edit", editStamp);

export default stampRouter;