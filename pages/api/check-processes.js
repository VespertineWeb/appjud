import dbConnect from '../../utils/dbConnect';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Dummy client data for testing
    const client = {
      caseNumber: '00008323520184013202',
      phone: '1234567890'
    };

    const updates = await checkUpdates(client);

    if (updates) {
      res.redirect(`/updates?caseNumber=${client.caseNumber}&details=${JSON.stringify(updates)}`);
    } else {
      res.status(200).json({ message: 'No updates found' });
    }
  } catch (error) {
    console.error('Error checking process updates:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
