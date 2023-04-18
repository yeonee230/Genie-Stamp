import mongoose from "mongoose";

const StampSchema = new mongoose.Schema({
    title: String
    //teacherID 추가 필요
});

const StampModel = mongoose.model("Stamp", StampSchema);

export default StampModel;