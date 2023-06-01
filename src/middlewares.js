import StampModel from './models/Stamp';
import StudentModel from './models/Student';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = '🧞‍♂️ Genie Stamp';
  res.locals.loggedUser = req.session.user;
  console.log('session user : ', req.session.user);
  next();
};

//로그인한 사용자만 사용 가능.
export const protectMiddeleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    //req.flash("error", "Not Authorized");
    return res.redirect('/login');
  }
};

//로그인하지 않은 사용자만 사용 가능.
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    //req.flash("error", "Not Authorized");
    return res.redirect('/');
  }
};
