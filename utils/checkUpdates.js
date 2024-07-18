const axios = require('axios');
const { sendWhatsAppNotification } = require('./sendNotification');
const endpoints = require('./endpoints');

const checkUpdates = async () => {
  const clients = await Client.find(); // Certifique-se de que o modelo Client está sendo importado corretamente.

  for (const client of clients) {
    const processNumber = client.caseNumber;
    const promises = Object.values(endpoints).map(async (url) => {
      try {
        const response = await axios.get(`${url}/${processNumber}`);
        const processUpdates = response.data;
        if (processUpdates && processUpdates.length > 0) {
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
      sendWhatsAppNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${updates.map(u => u.updates).join(', ')}`);
    }
  }
};

module.exports = checkUpdates;
