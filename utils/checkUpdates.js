const axios = require('axios');
const { sendWhatsAppNotification } = require('./sendNotification');
const endpoints = require('./endpoints');
const Client = require('../models/Client');

const checkUpdates = async () => {
  try {
    console.log('Conectando ao banco de dados...');
    const clients = await Client.find();
    console.log(`Clientes encontrados: ${clients.length}`);

    for (const client of clients) {
      const processNumber = client.caseNumber;
      console.log(`Verificando atualizações para o processo: ${processNumber}`);
      
      const promises = Object.values(endpoints).map(async (url) => {
        try {
          const response = await axios.get(`${url}/${processNumber}`);
          const processUpdates = response.data;
          if (processUpdates && processUpdates.length > 0) {
            console.log(`Atualizações encontradas no endpoint ${url} para o processo ${processNumber}`);
            return {
              url,
              updates: processUpdates
            };
          }
        } catch (error) {
          console.error(`Erro ao consultar atualizações no endpoint ${url}:`, error);
        }
        return null;
      });

      const results = await Promise.all(promises);

      const updates = results.filter(result => result !== null);
      if (updates.length > 0) {
        console.log(`Enviando notificação para o cliente ${client.phone} sobre o processo ${processNumber}`);
        sendWhatsAppNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${updates.map(u => u.updates).join(', ')}`);
      } else {
        console.log(`Nenhuma atualização encontrada para o processo ${processNumber}`);
      }
    }
  } catch (error) {
    console.error('Erro na função checkUpdates:', error);
    throw error;  // Re-throw the error to let the caller know that an error occurred
  }
};

module.exports = checkUpdates;
