export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "🧞‍♂️ Genie Stamp";
  res.locals.loggedUser = req.session.user;
  next();
};
