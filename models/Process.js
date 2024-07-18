import mongoose from 'mongoose';

const ProcessSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Process || mongoose.model('Process', ProcessSchema);
