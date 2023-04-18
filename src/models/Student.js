import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  index: String,
  
//   password: String,
//   stampId: objectID
  //teacherID 추가 필요
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
