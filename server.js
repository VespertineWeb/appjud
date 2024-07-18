const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors'); // Adicionar o middleware de CORS
const { sendNotification } = require('./utils/sendNotificantio');
const checkUpdates = require('./utils/checkUpdates');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

app.prepare().then(() => {
  const server = express();

  // Configurar CORS
  const corsOptions = {
    origin: 'https://appjud-ghmfaevia-afchristianns-projects.vercel.app', // Origem permitida
    optionsSuccessStatus: 200,
  };

  server.use(cors(corsOptions));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${dev ? 'http://localhost:3000' : 'production URL'}`);
  });

  setInterval(checkUpdates, 86400000); // Verificar a cada 24 horas
});
