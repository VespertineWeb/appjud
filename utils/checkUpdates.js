const axios = require('axios');
const sendWhatsAppNotification = require('./sendNotification');
const endpoints = require('./endpoints');

const checkUpdates = async (client) => {
  const endpointsArray = Object.values(endpoints);

  try {
    // Realizar todas as requisições em paralelo
    const responses = await Promise.all(endpointsArray.map(apiUrl => 
      axios.get(`${apiUrl}/${client.caseNumber}`)
    ));

    // Verificar se alguma das respostas tem atualizações
    for (const response of responses) {
      const processUpdates = response.data;
      if (processUpdates.hasUpdates) {
        // Enviar notificação via SendPulse
        sendWhatsAppNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${processUpdates.updateDetails}`);
        return; // Se encontrar uma atualização, sai da função
      }
    }

    console.log('Nenhuma atualização encontrada para o processo:', client.caseNumber);
  } catch (error) {
    console.error('Erro ao consultar atualizações do processo:', error);
  }
};

module.exports = checkUpdates;
