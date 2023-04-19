import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import settingtRouter from "./routers/settingRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
//import studentRouter from "./routers/studentRouter";

const app = express();
const logger = morgan("dev");

//view engine 세팅
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);

//라우터 설정
app.use("/", rootRouter);
// app.use("/stamp", stampRouter);
// app.use("/teacher", teacherRouter);
//app.use("/students", studentRouter);
app.use("/setting", settingtRouter);

export default app;
