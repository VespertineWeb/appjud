// routes/clients.js
const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

// Criar um novo cliente
router.post('/', async (req, res) => {
  const { name, phone, caseNumber } = req.body;

  try {
    const client = new Client({ name, phone, caseNumber });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client' });
  }
});

module.exports = router;
