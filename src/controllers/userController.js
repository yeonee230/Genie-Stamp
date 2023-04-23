import StampModel from "../models/Stamp";
import TeacherModel from "../models/Teacher";
import bcrypt from "bcrypt";
import StudentModel from "../models/Student";

export const home = async (req, res) => {
  const stamps = [{ title: "도장1" }, { title: "도장2" }];
  const students= [{ index: "1", name: "학생1", value: "8" }, { index: "2", name: "학생2", value: "2" }];
  // const { _id } = req.session.user;
  
  // const students = await StudentModel.find({ teacherId: _id });
  
  return res.render("home", { pageTitle: "칭찬도장판", stamps, students });
};

export const getSetting = async (req, res) => {
  const { _id } = req.session.user;

  const stamps = await StampModel.find({ teacherId: _id });
  const students = await StudentModel.find({ teacherId: _id });

  return res.render("setting", {
    pageTitle: "학생 및 도장 관리",
    stamps,
    students,
  });
};

//------------------ 회원가입 ------------------
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res) => {
  const { name, school, grade, classNum, email, password, password2 } =
    req.body;
  const pageTitle = "회원가입";

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const exists = await TeacherModel.exists({ email });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 가입된 이메일입니다.",
    });
  }

  try {
    await TeacherModel.create({
      name,
      email,
      grade,
      classNum,
      school,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

//------------------ 로그인 ------------------
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "교사용 로그인" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "교사용 로그인";
  const teacher = await TeacherModel.findOne({ email });
  if (!teacher) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "가입되지 않은 이메일입니다.",
    });
  }
  const ok = await bcrypt.compare(password, teacher.password);
 
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = teacher;
  return res.redirect("/");
};

export const getLogin2 = (req, res) => {
  return res.render("login2", { pageTitle: "학생용 로그인" });
};

//------------------ 로그아웃 ------------------
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

//------------------ 학생 추가 ------------------
export const postAddStudent = async (req, res) => {
  const { name, index } = req.body;
  const { _id } = req.session.user;
  const password = "0000"; //학생 초기 비밀번호 숫자 4자리

  const teacher = await TeacherModel.findById(_id);
  if (!teacher) {
    return res.sendStatus(404);
  }

  // currStamps: {
  //   stamp1: { type: Number },
  //   stamp2: { type: Number },
  //   stamp3: { type: Number },
  //   total: { type: Number },
  // },

  //학생 데이터 저장
  const newStudent = await StudentModel.create({
    name,
    index,
    password,
    teacherId: _id,
    currStamps: {
      stamp1: 0,
      stamp2: 0,
      stamp3: 0,
    },
  });
  //선생님 db에 추가 하고 
  teacher.students.push(newStudent._id);
  teacher.save();

  //선생님 세션에도 추가해야함. 
  req.session.user.students.push(newStudent._id);

  return res.redirect("/setting");
};
