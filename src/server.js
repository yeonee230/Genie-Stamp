import "./db";
import "./models/Stamp";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import settingtRouter from "./routers/settingRouter";
//import studentRouter from "./routers/studentRouter";

const app = express();
const PORT = 3000;

const logger = morgan("dev");

//view engine 세팅
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.json());

//미들웨어 세팅

//라우터 설정
app.use("/", rootRouter);
// app.use("/stamp", stampRouter);
// app.use("/teacher", teacherRouter);
//app.use("/students", studentRouter);
app.use("/setting", settingtRouter);

app.listen(PORT, () => console.log(`⭐️ Conneted server! PORT : ${PORT}`));
