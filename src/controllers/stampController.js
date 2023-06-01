import StampModel from "../models/Stamp";
import StudentModel from "../models/Student";

export const getBoard = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });

  //만약 오늘이 6월이면 디비에 6월 도장들을 넣어라 


  //const data = students.forEach(student => ({... student, index:11}));
  const students = dbStudents.map((item) => ({
    ...item._doc,
    currStamps: item.currStamps.filter(
      (stamp) => stamp.month === new Date().getMonth() + 1
    ),
  }));

  return res.render("board", { pageTitle: "칭찬도장판", stamps, students });
};

export const getStats = async (req, res) => {
  const { _id } = req.session.user;
  const stamps = await StampModel.find({ teacherId: _id });
  
  return res.render("stats", { pageTitle: "통계", stamps});
};

//칭찬 도장 종류 추가
export const addStampType = async (req, res) => {
  const { title } = req.body;

  const newStamp = new StampModel({
    title,
    teacherId: req.session.user._id,
  });
  await newStamp.save();

  res.redirect("/setting");
};

//칭찬 도장 종류 삭제
export const deleteStampType = async (req, res) => {
  const { id } = req.params; //stampID
  console.log("stamp id:: ", id);
  const stamp = await StampModel.findById(id);

  if (!stamp) {
    return res.status(404).render("404", { pageName: "stamp not found!" });
  }

  await StampModel.findByIdAndDelete(id);
  return res.redirect("/setting");
};

//칭찬 도장 이름 수정
export const editStampType = async (req, res) => {
  const { id } = req.params; //stampID

  await StampModel.findByIdAndUpdate(id, {
    title: req.body.title,
  });

  return res.redirect("/setting");
};

//-------------- 누적 도장 랭킹 가져오기 --------------
//이번달 누적 도장 랭킹 가져오기
export const rankingTotalStamps1 = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });
  // console.log("dbStudents:: ", dbStudents);

  const students = dbStudents.map((item) => ({
    ...item._doc,
    currStamps: item.currStamps.filter(
      (stamp) => stamp.month === new Date().getMonth() + 1
    ),
  }));
  // console.log("students:: ", students);

  const filteredStudents = students.sort(
    (a, b) => b.currStamps[0].total - a.currStamps[0].total
  );
  // console.log("filteredStudents:: ", filteredStudents);

  const rankingStudnets = filteredStudents.map((item, index) => ({
    ...item,
    ranking: index + 1,
  }));
  // console.log("rankingStudnets:: ", rankingStudnets);
  return res.render("stats", {
    pageTitle: "도장 통계",
    stamps,
    rankingStudnets,
  });
};
// rankingTotalStamps 함수 리팩토링
export const rankingTotalStamps = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });

  const filteredStudents = dbStudents.map((student) => ({
    ...student._doc,
    currStamps: student.currStamps.filter(
      (stamp) => stamp.month === new Date().getMonth() + 1
    ),
  }))
  .filter((student) => student.currStamps.length > 0)
  .sort((a, b) => b.currStamps[0].total - a.currStamps[0].total)
  .map((student, index) => ({ ...student, ranking: index + 1 }));

  return res.render("stats", {
    pageTitle: "도장 통계",
    stamps,
    rankingStudnets: filteredStudents,
  });
};