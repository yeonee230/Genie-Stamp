import express from "express";

const studentRouter = express.Router();

studentRouter.get("/add", addStamp);
studentRouter.get("/delete", deleteStamp);
studentRouter.get("/edit", editStamp);