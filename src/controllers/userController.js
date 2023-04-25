import StampModel from "../models/Stamp";
import TeacherModel from "../models/Teacher";
import bcrypt from "bcrypt";
import StudentModel from "../models/Student";

export const home = async (req, res) => {
  const stamps = [];
  const students = [];
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

  const stamps = await StampModel.find({ teacherId: _id });

  const stamp2 = stamps.map((item) => ({
    stamp_id: String(item._id),
    value: 0,
    title: item.title,
  }));
  console.log("stamp2", stamp2);

  //학생 데이터 저장
  const newStudent = await StudentModel.create({
    name,
    index,
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
  const updatedCurrStamps = student.currStamps.map((month) =>
    month.month === new Date().getMonth() + 1
      ? { ...month, stamps: updatedStamps, total: totalNum }
      : month
  );

  // Update the student in the database
  await StudentModel.findByIdAndUpdate(id, { currStamps: updatedCurrStamps });

  return res.status(201).redirect("/board");
};

//------------------ 학생 삭제 ------------------
export const delStudent = async(req, res) => {
  //1. url 파라미터에서 student id 받아온다. 
  //2. findByIdDelete() 사용한다. 
  //3. 리다이렉트 

  const {id} = req.params; //studentID
  console.log("id:: ", id)
  //const {_id} =req.session.user; //teacherID
  const student = await StudentModel.findById(id);

  if(!student){
      return res.status(404).render("404", { pageName : "Student not found!"});
  }

  if(String(student._id) !== String(id)){
      return res.status(403).redirect("/setting");
  }

  await StudentModel.findByIdAndDelete(id);
  return res.redirect("/setting");
};