const axios = require('axios');
const endpoints = require('./endpoints');
const { sendWhatsAppNotification } = require('./sendNotification');

const API_KEY = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=='; // Substitua pela sua chave pública

const checkUpdates = async (client) => {
  for (const tribunal in endpoints) {
    const apiUrl = endpoints[tribunal];
    try {
      const response = await axios.post(apiUrl, {
        query: {
          match: {
            numeroProcesso: client.caseNumber
          }
        }
      }, {
        headers: {
          'Authorization': `APIKey ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const processUpdates = response.data.hits.hits;

      if (processUpdates.length > 0) {
        const updateDetails = processUpdates[0]._source;
        sendWhatsAppNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${JSON.stringify(updateDetails)}`);
        return updateDetails;
      }
    } catch (error) {
      console.error(`Erro ao consultar atualizações no tribunal ${tribunal} para o processo ${client.caseNumber}:`, error.message);
    }
  }
  return null;
};

module.exports = checkUpdates;
