import mongoose from "mongoose";
const schema = mongoose.Schema({
  statement: { type: String, required: true },
  tags: { type: Array, required: true },
  viewState: { type: String, required: true },
  user_id: { type: String, required: true },
  qusTo_id: { type: String, required: true },
});

export default mongoose.model("question", schema);
