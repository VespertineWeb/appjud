const axios = require('axios');
const { sendWhatsAppNotification } = require('./sendNotification');
const endpoints = require('./endpoints');
const dbConnect = require('./dbConnect');
const Process = require('../models/Process');
const Client = require('../models/Client');
const Advocate = require('../models/Advocate');

const checkUpdates = async () => {
  await dbConnect();

  try {
    const processes = await Process.find({});

    for (let process of processes) {
      const caseNumber = process.caseNumber;

      for (let key in endpoints) {
        const apiUrl = endpoints[key];

        try {
          const response = await axios.get(`${apiUrl}?caseNumber=${caseNumber}`);
          const processUpdates = response.data;

          // Lógica para verificar atualizações
          if (processUpdates.hasUpdates) {
            const clients = await Client.find({ caseNumber: caseNumber });
            const advocates = await Advocate.find({ clients: { $in: clients.map(client => client._id) } });

            for (let client of clients) {
              await sendWhatsAppNotification(client.phone, `Atualização no processo ${caseNumber}: ${processUpdates.updateDetails}`);
            }

            for (let advocate of advocates) {
              await sendWhatsAppNotification(advocate.phone, `Atualização no processo ${caseNumber} de seu cliente: ${processUpdates.updateDetails}`);
            }

            process.lastChecked = new Date();
            await process.save();
          }
        } catch (error) {
          console.error(`Erro ao consultar atualizações do processo no endpoint ${key}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao verificar atualizações dos processos:', error);
  }
};

module.exports = checkUpdates;
