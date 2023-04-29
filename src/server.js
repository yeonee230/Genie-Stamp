import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import settingtRouter from "./routers/settingRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import studentRouter from "./routers/studentRouter";
import stampRouter from "./routers/stampRouter";

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

//multer 미들웨어 
//app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("assets")); //webpack
//app.use("/images", express.static('images')); 
//app.use('/favicon.ico', express.static('images/favicon.ico'));
//TODO:express-flash 미들웨어 추가

//라우터 설정
app.use("/", rootRouter);
app.use("/stamp", stampRouter);
// app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/setting", settingtRouter);

export default app;
