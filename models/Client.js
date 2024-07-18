// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  caseNumber: { type: String, required: true },
});

module.exports = mongoose.model('Client', ClientSchema);
