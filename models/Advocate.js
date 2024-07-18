import mongoose from 'mongoose';

const AdvocateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  ],
});

export default mongoose.models.Advocate || mongoose.model('Advocate', AdvocateSchema);
