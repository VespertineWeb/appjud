// listClients.js
const mongoose = require('mongoose');
const Client = require('./models/Client');
const dbConnect = require('./utils/dbConnect');

const listClients = async () => {
  await dbConnect();

  const clients = await Client.find();
  console.log(clients);

  mongoose.connection.close();
};

listClients();
