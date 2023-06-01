import StampModel from './models/Stamp';
import StudentModel from './models/Student';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = '🧞‍♂️ Genie Stamp';
  res.locals.loggedUser = req.session.user;
  console.log('session user : ', req.session.user);
  next();
};

//TODO:url protectMiddleware 만들어야함
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

export const monthCheckMiddleware = (req, res, next) => {
  // 월 변경 감지
  console.log('월 변경 감지 ---- ');
  let currentMonth = null; // 현재 월 변수
  const time = 1000 * 10; //하루  1000*60*60*24
  setInterval(() => {
    const newMonth = new Date().getMonth() + 1; // 현재 월 가져오기 (1월: 1, 2월: 2, ...)
    if (currentMonth !== newMonth) {
      currentMonth = newMonth;
      onMonthChanged(currentMonth, req);
    }
    console.log('월 변경 감지 : ', newMonth);
  }, time); // time 마다 월 변경 감지

  next();
};

// 월 변경 시 실행할 함수
async function onMonthChanged(newMonth, req) {
  try {
    // 월이 변경되었을 때 호출되는 콜백 함수로, 여기에 MongoDB에 월을 추가하는 로직을 작성합니다.
    const { _id } = req.session.user; // 선생님이 누군지 찾고
    const dbStudents = await StudentModel.find({ teacherId: _id }).exec(); // 선생님의 학생들을 모두 찾고
    const stamps = await StampModel.find({ teacherId: _id }).exec(); // 선생님의 도장을 모두 찾고

    // 학생 도장데이터에 새로운 month 추가하기
    for (const student of dbStudents) {
      student.currStamps.push({ month: newMonth, stamps, total: 0 });
      await student.save();
    }
  } catch (error) {
    console.error('월 변경 중 에러가 발생했습니다.', error);
  }
}
