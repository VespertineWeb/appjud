import dbConnect from '../../utils/dbConnect';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'GET') {
    try {
      console.log('Iniciando a verificação de processos...');
      await checkUpdates();
      console.log('Verificação de processos concluída com sucesso.');
      res.status(200).json({ success: true, message: 'Process updates checked successfully' });
    } catch (error) {
      console.error('Erro ao verificar processos:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
