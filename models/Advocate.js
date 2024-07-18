import dbConnect from '../../utils/dbConnect';
import Advocate from '../../models/Advocate';

export default async function handler(req, res) {
  console.log('Connecting to database...');
  await dbConnect();
  console.log('Database connected.');

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        console.log('Request body:', req.body);
        const advocate = await Advocate.create(req.body);
        console.log('Advocate created:', advocate);
        res.status(201).json({ success: true, data: advocate });
      } catch (error) {
        console.error('Error creating advocate:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
