import mongoose from "mongoose";
import bcrypt from "bcrypt";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String, required: true },
  grade: { type: Number, required: true },
  classNum: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

TeacherSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);

export default TeacherModel;
