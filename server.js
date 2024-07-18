const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const { sendNotification } = require('./utils/sendNotification');
const checkUpdates = require('./utils/checkUpdates');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 segundos de timeout para seleção do servidor
});

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${dev ? 'http://localhost:3000' : 'production URL'}`);
  });

  setInterval(checkUpdates, 86400000); // Verificar a cada 24 horas
});
