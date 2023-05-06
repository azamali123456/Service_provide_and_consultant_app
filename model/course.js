import mongoose from "mongoose";
const schema = mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  department: { type: String, required: true },
});

export default mongoose.model("course", schema);
