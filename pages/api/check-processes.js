import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await checkUpdates();
      res.status(200).json({ message: 'Processos verificados com sucesso.' });
    } catch (error) {
      console.error('Erro ao verificar processos:', error);
      res.status(500).json({ error: 'Erro ao verificar processos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
