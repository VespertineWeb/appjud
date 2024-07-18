import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const clients = await Client.find({});

    // Realizar todas as checagens de processos em paralelo
    await Promise.all(clients.map(client => checkUpdates(client)));

    res.status(200).json({ message: 'Process updates checked successfully' });
  } catch (error) {
    console.error('Erro ao verificar atualizações de processos:', error);
    res.status(500).json({ error: 'Erro ao verificar atualizações de processos' });
  }
}
