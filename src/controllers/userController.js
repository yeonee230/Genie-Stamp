import StampModel from "../models/Stamp";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getSetting = async (req, res) => {
  const students =[{index:"1", name:"학생1"}, {index:"2", name:"학생2"}];
  const stamps = await StampModel.find({});
  //StampModel.find({}, (error, stamps) =>{ } );

  return res.render("setting", { pageTitle: "학생 및 도장 관리", stamps, students });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "교사용 로그인" });
};

export const getLogin2 = (req, res) => {
  return res.render("login2", { pageTitle: "학생용 로그인" });
};


