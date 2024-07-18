import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';
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

        const client = await Client.create(req.body);
        console.log('Client created:', client);
        res.status(201).json({ success: true, data: client });
      } catch (error) {
        console.error('Error creating client:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
