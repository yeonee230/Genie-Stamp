import mongoose from "mongoose";

const StampSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

const StampModel = mongoose.model("Stamp", StampSchema);

export default StampModel;
