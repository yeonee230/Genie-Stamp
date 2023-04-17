export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getStudents = (req, res) => {
  return res.render("students", { pageTitle: "학생관리" });
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


