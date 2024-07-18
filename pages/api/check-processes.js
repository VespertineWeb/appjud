import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';
import checkUpdates from '../../utils/checkUpdates';

export default async function handler(req, res) {
  await dbConnect();

  const clients = await Client.find({});

  let updates = [];

  for (const client of clients) {
    const update = await checkUpdates(client);
    if (update) {
      updates.push({
        caseNumber: client.caseNumber,
        updateDetails: update
      });
    }
  }

  res.status(200).json(updates);
}
