import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const clients = await Client.find({});

    const updates = [];

    for (const client of clients) {
      const hasUpdates = await checkUpdates(client);
      if (hasUpdates) {
        updates.push({
          caseNumber: client.caseNumber,
          updateDetails: hasUpdates
        });
      }
    }

    // Redirecionar para a página de resultados com os dados de atualização
    res.redirect(`/updates?results=${encodeURIComponent(JSON.stringify(updates))}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
