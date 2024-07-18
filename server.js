const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');

const clientsRouter = require('./routes/clients');
const advocatesRouter = require('./routes/advocates');
const checkUpdates = require('./utils/checkUpdates');
const Client = require('./models/Client');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Usar Rotas
app.use('/api/clients', clientsRouter);
app.use('/api/advocates', advocatesRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Verificação periódica de atualizações de processos a cada 24 horas
setInterval(async () => {
  const clients = await Client.find();
  clients.forEach(client => {
    checkUpdates(client);
  });
}, 86400000); // 24 horas = 86400000 ms

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
