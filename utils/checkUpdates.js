const axios = require('axios');
const { sendWhatsAppNotification } = require('./sendNotification');
const endpoints = require('./endpoints');

const checkUpdates = async () => {
  // Obtendo todos os clientes
  const clients = await Client.find();
  
  for (const client of clients) {
    for (const [key, apiUrl] of Object.entries(endpoints)) {
      try {
        const response = await axios.get(`${apiUrl}/${client.caseNumber}`);
        const processUpdates = response.data;

        // Lógica para verificar atualizações
        if (processUpdates.hasUpdates) {
          // Enviar notificação via SendPulse
          sendWhatsAppNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${processUpdates.updateDetails}`);
        }
      } catch (error) {
        console.error('Erro ao consultar atualizações do processo:', error);
      }
    }
  }
};

module.exports = checkUpdates;
