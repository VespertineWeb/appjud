import axios from 'axios';
import sendNotification from './sendNotification';
import endpoints from './endpoints';

const API_KEY = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';

const checkUpdates = async (client) => {
  const tribunalKeys = Object.keys(endpoints);
  const processUpdates = [];

  for (const key of tribunalKeys) {
    try {
      const response = await axios.post(endpoints[key], {
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

      const hits = response.data.hits.hits;
      if (hits.length > 0) {
        processUpdates.push(hits[0]._source);
      }
    } catch (error) {
      console.error(`Error fetching updates from ${key}:`, error);
    }
  }

  if (processUpdates.length > 0) {
    // Enviar notificação via SendPulse
    sendNotification(client.phone, `Atualização no processo ${client.caseNumber}: ${JSON.stringify(processUpdates)}`);
    return processUpdates;
  }

  return null;
};

export default checkUpdates;
