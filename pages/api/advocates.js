import dbConnect from '../../utils/dbConnect';
import Advocate from '../../models/Advocate';
import Cors from 'cors';

// Inicializar o middleware de CORS
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*', // Altere isso conforme necessário para restringir o acesso
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

        // Validar o corpo da solicitação
        if (!req.body.name || !req.body.phone || !Array.isArray(req.body.clients)) {
          console.error('Invalid request body:', req.body);
          return res.status(400).json({ success: false, error: 'Invalid request body' });
        }

        // Certifique-se de que o clients array está formatado corretamente
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
