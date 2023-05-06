import mongoose from "mongoose";
const schema = mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  subServices: { type: Object, required: true },
});

export default mongoose.model("Service", schema);
