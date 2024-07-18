const axios = require('axios');
const sendWhatsAppNotification = require('./sendNotification');
const endpoints = require('./endpoints');

const checkUpdates = async (client) => {
  const apiUrl = endpoints['cnj', 'tst', 'tse', 'stj', 'stm', 'trf1', 'trf2', 'trf3', 'trf4', 'trf5', 'trf6', 'tjac', 'tjal', 'tjam', 'tjap', 'tjba', 'tjce', 'tjdft', 'tjes', 'tjgo', 'tjma', 'tjmg', 'tjms', 'tjmt', 'tjpa', 'tjpb', 'tjpe', 'tjpi', 'tjpr', 'tjrj', 'tjrn', 'tjro', 'tjrr', 'tjrs', 'tjsc', 'tjse', 'tjsp', 'tjto', 'trt1', 'trt2', 'trt3', 'trt4', 'trt5', 'trt6', 'trt7', 'trt8', 'trt9', 'trt10', 'trt11', 'trt12', 'trt13', 'trt14', 'trt15', 'trt16', 'trt17', 'trt18', 'trt19', 'trt20', 'trt21', 'trt22', 'trt23', 'trt24', 'tre_ac', 'tre_al', 'tre_am', 'tre_ap', 'tre_ba', 'tre_ce', 'tre_dft', 'tre_es', 'tre_go', 'tre_ma', 'tre_mg', 'tre_ms', 'tre_mt', 'tre_pa', 'tre_pb']
  ; // Use a chave apropriada para outros tribunais

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
};

module.exports = checkUpdates;
