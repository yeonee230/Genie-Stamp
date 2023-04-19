import StampModel from "../models/Stamp";
import TeacherModel from "../models/Teacher";
import bcrypt from "bcrypt";

export const home = (req, res) => {
  const stamps = [{ title: "도장1" }, { title: "도장2" }];
  //const stamps = [];
  const students = [
    { index: "1", name: "학생1", value: "8" },
    { index: "2", name: "학생2", value: "2" },
  ];
  res.render("home", { pageTitle: "칭찬도장판", stamps, students });
};

export const getSetting = async (req, res) => {
  const students = [
    { index: "1", name: "학생1" },
    { index: "2", name: "학생2" },
  ];
  const stamps = await StampModel.find({});
  //StampModel.find({}, (error, stamps) =>{ } );

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
