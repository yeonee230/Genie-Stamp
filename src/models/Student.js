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
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
