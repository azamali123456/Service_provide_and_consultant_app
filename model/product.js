import mongoose from "mongoose";
const schema = mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: { type: String, required: true },
  image: { type: String, required: false },
});

export default mongoose.model("product", schema);
