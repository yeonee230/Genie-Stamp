import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  index: { type: Number, required: true },
  password: { type: String, required: true },
  currStamps: { type: mongoose.Schema.Types.Mixed },
  // currStamps: { 
  //   [{stamp_id: {type: mongoose.Schema.Types.ObjectId},
  //   value: { type: Number }} ]},
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
