import mongoose from 'mongoose';
const schema = mongoose.Schema({
  userName: { type: String, required: true },
  channalName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  channalTages: { type: String, required: true },
  professionName: { type: String, required: true },
  professionExperience: { type: String, required: true },
  reasonForChannal: { type: String, required: true },
  lastDegree: { type: String, required: true },
  anyCertificate: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.model('channal', schema);
