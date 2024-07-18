import dbConnect from '../../utils/dbConnect';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'GET') {
    try {
      await checkUpdates();
      res.status(200).json({ success: true, message: 'Process updates checked successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
