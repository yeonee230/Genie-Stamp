import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  index: { type: Number, required: true },
  password: { type: String, required: true },
  currStamps: {
    stamp1: { type: Number },
    stamp2: { type: Number },
    stamp3: { type: Number },
    total: { type: Number },
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
