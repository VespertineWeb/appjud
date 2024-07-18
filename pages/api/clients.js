import connectMongo from '../../lib/mongodb';
import Client from '../../models/Client';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'POST') {
    const { name, phone, caseNumber } = req.body;

    try {
      const client = new Client({ name, phone, caseNumber });
      await client.save();

      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create client' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
