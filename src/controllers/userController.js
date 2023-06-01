import StampModel from "../models/Stamp";
import TeacherModel from "../models/Teacher";
import bcrypt from "bcrypt";
import StudentModel from "../models/Student";

export const home = async (req, res) => {
  const stamps = [];
  const students = [];
  // const { _id } = req.session.user;

  // const students = await StudentModel.find({ teacherId: _id });

  return res.render("home", { pageTitle: "칭찬도장판"});
};
//---------------- 학생 메인 페이지 모여주기 ----------------
export const studentMain = async (req, res) => {
  const { _id } = req.session.user; // student Id
  const student = await StudentModel.findById({ _id });
  const stamps = await StampModel.find({ teacherId: student.teacherId });

  //이번달 기록만 가져올 수 있도록
  const currValue = student.currStamps.filter(
    (item) => item.month === new Date().getMonth() + 1
  );

  const newStudent = { ...student._doc, currStamps: currValue };

  return res.render("students/student-main", {
    pageTitle: "칭찬도장판",
    stamps,
    newStudent,
  });
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
  const exists = await TeacherModel.exists({ email: email.trim() });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 가입된 이메일입니다.",
    });
  }

  try {
    await TeacherModel.create({
      name: name.trim(),
      email: email.trim(),
      grade: grade.trim(),
      classNum: classNum.trim(),
      school: school.trim(),
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
  const teacher = await TeacherModel.findOne({ email: email.trim() });
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

//------------------ 학생용 로그인 ------------------
export const getLogin2 = (req, res) => {
  return res.render("login2", { pageTitle: "학생용 로그인" });
};

export const postLogin2 = async (req, res) => {
  const { teacher_name, name, password } = req.body;
  const pageTitle = "학생용 로그인";
  const teacher = await TeacherModel.findOne({ name: teacher_name.trim() });
  if (!teacher) {
    return res.status(400).render("login2", {
      pageTitle,
      errorMessage: "가입되지 않은 선생님입니다. 선생님 이름을 확인해 주세요.",
    });
  }

  const student = await StudentModel.findOne({
    name: name.trim(),
    teacherId: teacher._id,
  });
  //const student = await StudentModel.findOne({name : name.trim()});

  if (!student) {
    return res.status(400).render("login2", {
      pageTitle,
      errorMessage: "가입되어 있지 않은 학생입니다. 다시 확인해 주세요.",
    });
  }

  if (password.trim() !== student.password.trim()) {
    return res.status(400).render("login2", {
      pageTitle,
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = student;
  return res.redirect("/student-main");
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

  const stamps = await StampModel.find({ teacherId: _id });

  //stamp2 : 교사 id로 디비에서 가져온 stamps(공부, 밥, ..) 에 객체를 넣어주는 거  
  const stamp2 = stamps.map((item) => ({
    stamp_id: String(item._id),
    value: 0,
    title: item.title,
  }));
  console.log("stamp2", stamp2); // [{stamp_id:1, value:0, title: '밥'},{stamp_id:2, value:0, title: '공부'}...]

  //학생 데이터 저장
  const newStudent = await StudentModel.create({
    name: name.trim(),
    index: index.trim(),
    password,
    teacherId: _id,
    currStamps: [
      { month: new Date().getMonth() + 1, stamps: stamp2, total: 0 },
    ],
  });
  //선생님 db에 추가 하고
  teacher.students.push(newStudent._id);
  teacher.save();

  //선생님 세션에도 추가해야함.
  req.session.user.students.push(newStudent._id);

  return res.redirect("/setting");
};

//------------------ 학생 개별 도장 업데이트 ------------------
export const updateStampValue = async (req, res) => {
  const { id } = req.params; //학생 id
  const { stam_id, stampNum, totalNum } = req.body; //stamp_id, value
  const student = await StudentModel.findById(id);
  //console.log("student", student);

  const resultMonth = student.currStamps.find(
    (item) => item.month === new Date().getMonth() + 1
  );

  //console.log("result::", resultMonth);//month로 해당 객체 찾는다.

  const result2 = resultMonth.stamps.find((item) => item.stamp_id === stam_id); //.value = stampNum;
  const obj = { ...result2, value: stampNum };
  //console.log("obj:: ", obj); // 수정된 도장 개수 객체에 update한다.

  const resultMonthUpdate = {
    ...resultMonth,
    stamps: resultMonth.stamps.map((item) =>
      item.stamp_id === stam_id ? obj : item
    ),
    total: totalNum,
  };
  console.log("resultMonthUpdate:: ", resultMonthUpdate);

  await StudentModel.findByIdAndUpdate(id, {
    currStamps: student.currStamps.map((item) =>
      item.month === new Date().getMonth() + 1 ? resultMonthUpdate : item
    ),
  });

  return res.status(201).redirect("/board");
};

//refactoring
export const updateStampValue2 = async (req, res) => {
  const { id } = req.params; // Student ID
  const { stam_id, stampNum, totalNum } = req.body; // Stamp ID and updated values
  const student = await StudentModel.findById(id);

  // Find the stamps for the current month
  const { stamps, total } = student.currStamps.find(
    (item) => item.month === new Date().getMonth() + 1
  );

  // Update the stamp value and calculate the new total
  const updatedStamps = stamps.map((stamp) =>
    stamp.stamp_id === stam_id ? { ...stamp, value: stampNum } : stamp
  );

  // Update the current month's stamps and total
  const updatedCurrStamps = student.currStamps.map((item) =>
    item.month === new Date().getMonth() + 1
      ? { ...item, stamps: updatedStamps, total: totalNum }
      : item
  );

  // Update the student in the database
  await StudentModel.findByIdAndUpdate(id, { currStamps: updatedCurrStamps });

  return res.status(201).redirect("/board");
};

//------------------ 학생 삭제 ------------------
export const delStudent = async (req, res) => {
  //1. url 파라미터에서 student id 받아온다.
  //2. findByIdDelete() 사용한다.
  //3. 리다이렉트

  const { id } = req.params; //studentID
  console.log("id:: ", id);
  //const {_id} =req.session.user; //teacherID
  const student = await StudentModel.findById(id);

  if (!student) {
    return res.status(404).render("404", { pageName: "Student not found!" });
  }

  if (String(student._id) !== String(id)) {
    return res.status(403).redirect("/setting");
  }

  await StudentModel.findByIdAndDelete(id);
  return res.redirect("/setting");
};

//------------------ 학생 비밀번호 변경 ------------------
export const getPwChange = (req, res) => {
  return res.render("students/password-change", { pageTitle: "비밀번호 변경" });
};

export const postPwChange = async (req, res) => {
  const { password, password2 } = req.body;
  const { _id } = req.session.user;
  const student = await StudentModel.findById({ _id });
  //const currentPWInDB = student.password;

  if (password !== password2) {
    return res.status(400).render("students/password-change", {
      pageTitle: "비밀번호 변경",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }

  student.password = password; //저장할 때 User에 만들어둔 함수가 해시로 바꿔줌.
  await student.save();

  return res.redirect("/logout");
};

//------------------ 학생 비밀번호 초기화 ------------------
export const resetPW = async (req, res) => {
  const { id } = req.params; //studentID

  const student = await StudentModel.findById(id);

  if (!student) {
    return res.status(404).render("404", { pageName: "Student not found!" });
  }

  student.password = "0000";
  await student.save();
  return res.redirect("/setting");
};
