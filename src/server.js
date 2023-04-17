import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const app = express();
const PORT = 3000;

const logger = morgan("dev");

//view engine 세팅
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

//미들웨어 세팅

//라우터 설정
app.use("/", rootRouter);
// app.use("/stamp", stampRouter);
// app.use("/teacher", teacherRouter);
// app.use("/student", studentRouter);

app.listen(PORT, () => console.log(`⭐️ Conneted server! PORT : ${PORT}`));
