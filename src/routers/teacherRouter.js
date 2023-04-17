import express from "express";

const teacherRouter = express.Router();

teacherRouter.get("/logout", logout);