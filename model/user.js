import mongoose from "mongoose";
const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, required: true },
  password: { type: String, required: true },
  profession: { type: String, required: false },
  experience: { type: String, required: false },
});

export default mongoose.model("User", schema);
