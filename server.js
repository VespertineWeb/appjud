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
  serverSelectionTimeoutMS: 5000 // 5 segundos de timeout para seleção do servidor
});

app.prepare().then(() => {
  const server = express();

  // Configurar CORS
  const corsOptions = {
    origin: ['https://appjud-ghmfaevia-afchristianns-projects.vercel.app', 'https://appjud.vercel.app'], // Origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  server.use(cors(corsOptions));

  server.options('*', cors(corsOptions)); // Enable pre-flight for all routes

  server.all('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adicionar o cabeçalho diretamente
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${dev ? 'http://localhost:3000' : 'production URL'}`);
  });

  setInterval(checkUpdates, 86400000); // Verificar a cada 24 horas
});
