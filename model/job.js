import mongoose from 'mongoose';
const schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  jobType: { type: String, required: true },
  description: { type: String, required: true },
  problemStatement: { type: String, required: true },
  invitationKey: { type: String, required: false },
  problemImages: { type: String, required: true },
  phone: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('job', schema);
