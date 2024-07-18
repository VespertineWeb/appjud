import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  caseNumber: {
    type: String,
    required: true,
  },
});

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

export default Client;
