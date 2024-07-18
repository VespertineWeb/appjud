const axios = require('axios');
const { sendWhatsAppNotification } = require('./sendNotification');
const endpoints = require('./endpoints');
const dbConnect = require('./dbConnect');
const Process = require('../models/Process');
const Client = require('../models/Client');
const Advocate = require('../models/Advocate');

const checkUpdates = async (caseNumber) => {
  for (let key in endpoints) {
    const apiUrl = endpoints[key];

    try {
      const response = await axios.get(`${apiUrl}?caseNumber=${caseNumber}`);
      const processUpdates = response.data;

      // Lógica para verificar atualizações
      if (processUpdates.hasUpdates) {
        return { hasUpdates: true, updateDetails: processUpdates.updateDetails };
      }
    } catch (error) {
      console.error(`Erro ao consultar atualizações do processo no endpoint ${key}:`, error);
    }
  }

  return { hasUpdates: false };
};

module.exports = checkUpdates;
