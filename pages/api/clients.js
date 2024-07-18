// pages/api/clients.js
import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const client = await Client.create(req.body);
        res.status(201).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
