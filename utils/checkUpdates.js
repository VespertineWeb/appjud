const axios = require('axios');
const endpoints = require('./endpoints');

const checkUpdates = async (client) => {
  const processUpdates = [];
  
  for (const key in endpoints) {
    const apiUrl = endpoints[key];
    try {
      const response = await axios.get(`${apiUrl}/${client.caseNumber}`);
      if (response.data && response.data.hasUpdates) {
        processUpdates.push({
          tribunal: key,
          details: response.data.updateDetails
        });
      }
    } catch (error) {
      console.error(`Erro ao consultar atualizações do processo no tribunal ${key}:`, error);
    }
  }
  
  return processUpdates.length > 0 ? processUpdates : null;
};

module.exports = checkUpdates;
