import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';
import Cors from 'cors';

// Inicializar o middleware de CORS
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*' // Altere isso conforme necessário para restringir o acesso
});

// Função auxiliar para rodar o middleware
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
  await runMiddleware(req, res, cors); // Aplicar o middleware de CORS

  console.log('Connecting to database...');
  await dbConnect();
  console.log('Database connected.');

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        console.log('Request body:', req.body); // Log do corpo da solicitação
        
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
