// models/Advocate.js
const mongoose = require('mongoose');

const AdvocateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
});

module.exports = mongoose.model('Advocate', AdvocateSchema);
