// routes/advocates.js
const express = require('express');
const Advocate = require('../models/Advocate');
const router = express.Router();

// Criar um novo advogado
router.post('/', async (req, res) => {
  const { name, phone, clients } = req.body;

  try {
    const advocate = new Advocate({ name, phone, clients });
    await advocate.save();
    res.status(201).json(advocate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create advocate' });
  }
});

module.exports = router;
