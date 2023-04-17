export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
