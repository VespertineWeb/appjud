import dbConnect from '../../utils/dbConnect';
import Advocate from '../../models/Advocate';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*'
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  console.log('Connecting to database...');
  await dbConnect();
  console.log('Database connected.');

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        console.log('Request body:', req.body);

        if (!req.body.name || !req.body.phone || !Array.isArray(req.body.clients)) {
          console.error('Invalid request body:', req.body);
          return res.status(400).json({ success: false, error: 'Invalid request body' });
        }

        const clientsFormatted = req.body.clients.map(client => ({ name: client }));

        const advocate = new Advocate({
          name: req.body.name,
          phone: req.body.phone,
          clients: clientsFormatted,
        });

        await advocate.save();

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
