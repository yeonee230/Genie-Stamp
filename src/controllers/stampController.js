import StampModel from "../models/Stamp";

// export const getBoard = (req, res) => {
//   const stamps =[{title:"도장1"},{title:"도장2"}];
//   const students =[{index:"1", name:"학생1",value:"8"}, {index:"2", name:"학생2",value:"2"}];
//   res.render("home", { pageTitle: "칭찬도장판",stamps, students });
// };

export const getStats = (req, res) => {
    res.render("stats", { pageTitle: "통계" });
  };
  
//칭찬 도장 종류 추가 
export const addStampType = async (req, res) => {
  const { title }= req.body;
  
  const newStamp = new StampModel({
    title,
  });
  await newStamp.save();

  res.redirect("/setting");
};