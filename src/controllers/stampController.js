import StampModel from "../models/Stamp";
import StudentModel from "../models/Student";

export const getBoard = async (req, res) => {
  const { _id } = req.session.user;
  const students = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });

  return res.render("home", { pageTitle: "칭찬도장판",stamps, students });
};

export const getStats = (req, res) => {
    res.render("stats", { pageTitle: "통계" });
  };
  
//칭찬 도장 종류 추가 
export const addStampType = async (req, res) => {
  const { title }= req.body;
  
  const newStamp = new StampModel({
    title,
    teacherId: req.session.user._id,
  });
  await newStamp.save();

  res.redirect("/setting");
};