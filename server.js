const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors'); // Adicione esta linha

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Conecte ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.prepare().then(() => {
  const server = express();

  // Use CORS para permitir requisições de diferentes origens
  server.use(cors({
    origin: '*', // Altere isso conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${dev ? 'http://localhost:3000' : 'production URL'}`);
  });
});
