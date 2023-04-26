import StampModel from "../models/Stamp";
import StudentModel from "../models/Student";

export const getBoard = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });

  //const data = students.forEach(student => ({... student, index:11}));
  const students = dbStudents.map((item) => ({
    ...item._doc,
    currStamps: item.currStamps.filter((stamp) => stamp.month === new Date().getMonth() + 1),
  }));
  
  return res.render("board", { pageTitle: "칭찬도장판", stamps, students });
};

export const getStats = (req, res) => {
  res.render("stats", { pageTitle: "통계" });
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
