import dbConnect from '../../utils/dbConnect';
import Process from '../../models/Process';
import Client from '../../models/Client';
import Advocate from '../../models/Advocate';
import { sendWhatsAppNotification } from '../../utils/sendNotification';
const checkUpdates = require('../../utils/checkUpdates');

export default async function handler(req, res) {
  await dbConnect();

  try {
    const processes = await Process.find({});

    for (let process of processes) {
      const { hasUpdates, updateDetails } = await checkUpdates(process.caseNumber);

      if (hasUpdates) {
        const clients = await Client.find({ caseNumber: process.caseNumber });
        const advocates = await Advocate.find({ clients: { $in: clients.map(client => client._id) } });

        for (let client of clients) {
          await sendWhatsAppNotification(client.phone, `Atualização no processo ${process.caseNumber}: ${updateDetails}`);
        }

        for (let advocate of advocates) {
          await sendWhatsAppNotification(advocate.phone, `Atualização no processo ${process.caseNumber} de seu cliente: ${updateDetails}`);
        }

        process.lastChecked = new Date();
        await process.save();
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
